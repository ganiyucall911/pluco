// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PlucoMarket
 * @notice Secondary market for PLUCO Originals. Sellers list a token at a fixed
 *         price, buyers pay in native ETH, and EIP-2981 royalties are paid out of
 *         the sale before the seller is settled. Pluco takes a configurable fee
 *         (default 2.5%) that funds the platform.
 *
 *         Deliberately small: no offers, no auctions, no upgradeability. Every
 *         listing is a single struct, so a buyer can always verify the terms onchain.
 */
contract PlucoMarket is ReentrancyGuard {
    IERC721 public immutable collection;
    address public immutable feeRecipient;
    address public owner;

    /// @notice Marketplace fee in basis points. Capped at 10%.
    uint96 public feeBps;

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event Purchased(uint256 indexed tokenId, address indexed buyer, uint256 price, uint256 royalty, uint256 fee);
    event Cancelled(uint256 indexed tokenId, address indexed seller);
    event FeeUpdated(uint96 feeBps);

    error NotOwner();
    error NotListed();
    error NotSeller();
    error BadPrice();
    error NotApproved();
    error WrongValue(uint256 expected, uint256 sent);
    error FeeTooHigh();
    error PayoutFailed();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor(address collection_, address feeRecipient_, uint96 feeBps_) {
        collection = IERC721(collection_);
        feeRecipient = feeRecipient_;
        owner = msg.sender;
        if (feeBps_ > 1000) revert FeeTooHigh();
        feeBps = feeBps_;
    }

    /// @notice List a token you own. Approve this contract first.
    function list(uint256 tokenId, uint256 price) external {
        if (collection.ownerOf(tokenId) != msg.sender) revert NotOwner();
        if (price == 0) revert BadPrice();
        bool approved = collection.isApprovedForAll(msg.sender, address(this))
            || collection.getApproved(tokenId) == address(this);
        if (!approved) revert NotApproved();

        listings[tokenId] = Listing({seller: msg.sender, price: price});
        emit Listed(tokenId, msg.sender, price);
    }

    function cancel(uint256 tokenId) external {
        Listing memory l = listings[tokenId];
        if (l.seller == address(0)) revert NotListed();
        if (l.seller != msg.sender) revert NotSeller();
        delete listings[tokenId];
        emit Cancelled(tokenId, msg.sender);
    }

    /// @notice Buy a listed token. Send exactly the listed price.
    function buy(uint256 tokenId) external payable nonReentrant {
        Listing memory l = listings[tokenId];
        if (l.seller == address(0)) revert NotListed();
        if (msg.value != l.price) revert WrongValue(l.price, msg.value);

        delete listings[tokenId];

        uint256 royalty;
        address royaltyReceiver;
        try IERC2981(address(collection)).royaltyInfo(tokenId, l.price) returns (address r, uint256 a) {
            royaltyReceiver = r;
            royalty = a;
        } catch {}

        uint256 fee = (l.price * feeBps) / 10000;
        if (royalty + fee > l.price) {
            royalty = 0; // never let a bad royalty config break a sale
            royaltyReceiver = address(0);
        }

        uint256 sellerProceeds = l.price - royalty - fee;

        collection.transferFrom(l.seller, msg.sender, tokenId);

        if (royalty > 0 && royaltyReceiver != address(0)) {
            (bool okRoyalty, ) = payable(royaltyReceiver).call{value: royalty}("");
            if (!okRoyalty) revert PayoutFailed();
        }
        if (fee > 0) {
            (bool okFee, ) = payable(feeRecipient).call{value: fee}("");
            if (!okFee) revert PayoutFailed();
        }
        if (sellerProceeds > 0) {
            (bool okSeller, ) = payable(l.seller).call{value: sellerProceeds}("");
            if (!okSeller) revert PayoutFailed();
        }

        emit Purchased(tokenId, msg.sender, l.price, royalty, fee);
    }

    function setFee(uint96 feeBps_) external onlyOwner {
        if (feeBps_ > 1000) revert FeeTooHigh();
        feeBps = feeBps_;
        emit FeeUpdated(feeBps_);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
