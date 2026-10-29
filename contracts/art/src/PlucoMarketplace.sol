// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {PlucoRegistry} from "./PlucoRegistry.sol";

/**
 * @title PlucoMarketplace
 * @notice Settlement layer for art registered on PLUCO.
 *
 *         - Non-custodial: the seller keeps the token and only approves this contract.
 *         - Royalties: reads EIP-2981 from the collection and pays the artist on every resale.
 *         - Protocol fee: capped at 5%, default 2.5%, paid to the PLUCO treasury.
 *         - Proceeds are credited, then withdrawn (pull pattern), so a hostile receiver
 *           can never block or re-enter a sale.
 */
contract PlucoMarketplace is Ownable, ReentrancyGuard {
    struct Listing {
        address seller;
        address collection;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    PlucoRegistry public registry;
    address public treasury;
    uint96 public feeBps;

    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public activeListing; // collection => tokenId => listingId + 1
    mapping(address => uint256) public credits;

    event Listed(uint256 indexed listingId, address indexed collection, uint256 indexed tokenId, address seller, uint256 price);
    event PriceUpdated(uint256 indexed listingId, uint256 price);
    event Delisted(uint256 indexed listingId);
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price, uint256 royalty, uint256 fee);
    event Withdrawn(address indexed account, uint256 amount);
    event RegistrySet(address registry);
    event TreasurySet(address treasury);
    event FeeSet(uint96 feeBps);

    error NotRegistered();
    error NotOwnerOfToken();
    error NotApproved();
    error BadPrice();
    error NotSeller();
    error Inactive();
    error WrongValue(uint256 expected);
    error TransferFailed();
    error FeeTooHigh();
    error NothingToWithdraw();

    constructor(address owner_, PlucoRegistry registry_, address treasury_, uint96 feeBps_) Ownable(owner_) {
        if (address(registry_) == address(0) || treasury_ == address(0)) revert NotRegistered();
        if (feeBps_ > 500) revert FeeTooHigh();
        registry = registry_;
        treasury = treasury_;
        feeBps = feeBps_;
    }

    function list(address collection, uint256 tokenId, uint256 price) external returns (uint256 listingId) {
        if (!registry.isActive(collection)) revert NotRegistered();
        if (IERC721(collection).ownerOf(tokenId) != msg.sender) revert NotOwnerOfToken();
        if (
            IERC721(collection).getApproved(tokenId) != address(this) &&
            !IERC721(collection).isApprovedForAll(msg.sender, address(this))
        ) revert NotApproved();
        if (price == 0) revert BadPrice();

        uint256 existing = activeListing[collection][tokenId];
        if (existing != 0) _close(existing - 1);

        listingId = ++listingCount;
        listings[listingId] = Listing({
            seller: msg.sender,
            collection: collection,
            tokenId: tokenId,
            price: price,
            active: true
        });
        activeListing[collection][tokenId] = listingId + 1;

        emit Listed(listingId, collection, tokenId, msg.sender, price);
    }

    function updatePrice(uint256 listingId, uint256 price) external {
        Listing storage l = _listing(listingId);
        if (l.seller != msg.sender) revert NotSeller();
        if (price == 0) revert BadPrice();
        l.price = price;
        emit PriceUpdated(listingId, price);
    }

    function cancel(uint256 listingId) external {
        Listing storage l = _listing(listingId);
        if (l.seller != msg.sender) revert NotSeller();
        _close(listingId);
        emit Delisted(listingId);
    }

    function buy(uint256 listingId) external payable nonReentrant {
        Listing storage l = _listing(listingId);
        if (!l.active) revert Inactive();
        if (msg.value != l.price) revert WrongValue(l.price);

        address seller = l.seller;
        address collection = l.collection;
        uint256 tokenId = l.tokenId;
        uint256 price = l.price;

        // Re-verify the seller still holds and still approves: the listing is not custody.
        if (IERC721(collection).ownerOf(tokenId) != seller) revert NotOwnerOfToken();

        uint256 royalty;
        address royaltyReceiver;
        if (IERC165Check.supportsRoyalty(collection)) {
            (royaltyReceiver, royalty) = IERC2981(collection).royaltyInfo(tokenId, price);
            if (royalty > price) royalty = price;
            if (royaltyReceiver == address(0)) royalty = 0;
        }

        uint256 fee = (price * feeBps) / 10_000;
        uint256 sellerProceeds = price - royalty - fee;

        _close(listingId);

        IERC721(collection).transferFrom(seller, msg.sender, tokenId);

        if (royalty > 0) credits[royaltyReceiver] += royalty;
        if (fee > 0) credits[treasury] += fee;
        credits[seller] += sellerProceeds;

        emit Sold(listingId, msg.sender, price, royalty, fee);
    }

    function withdraw() external nonReentrant {
        uint256 amount = credits[msg.sender];
        if (amount == 0) revert NothingToWithdraw();
        credits[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        if (!ok) revert TransferFailed();
        emit Withdrawn(msg.sender, amount);
    }

    function setRegistry(PlucoRegistry registry_) external onlyOwner {
        registry = registry_;
        emit RegistrySet(address(registry_));
    }

    function setTreasury(address treasury_) external onlyOwner {
        treasury = treasury_;
        emit TreasurySet(treasury_);
    }

    function setFee(uint96 feeBps_) external onlyOwner {
        if (feeBps_ > 500) revert FeeTooHigh();
        feeBps = feeBps_;
        emit FeeSet(feeBps_);
    }

    function _listing(uint256 listingId) private view returns (Listing storage l) {
        l = listings[listingId];
        if (l.seller == address(0)) revert Inactive();
    }

    function _close(uint256 listingId) private {
        Listing storage l = listings[listingId];
        l.active = false;
        if (activeListing[l.collection][l.tokenId] == listingId + 1) {
            delete activeListing[l.collection][l.tokenId];
        }
    }
}

library IERC165Check {
    function supportsRoyalty(address collection) internal view returns (bool) {
        (bool ok, bytes memory data) = collection.staticcall(
            abi.encodeWithSignature("supportsInterface(bytes4)", bytes4(0x2a55205a))
        );
        return ok && data.length == 32 && abi.decode(data, (bool));
    }
}
