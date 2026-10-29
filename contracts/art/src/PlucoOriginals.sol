// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PlucoOriginals
 * @notice 1-of-1 digital art collection for PLUCO.
 *         Every token has its own metadata URI, so each piece stays unique.
 *         Royalties follow EIP-2981 and are honoured by OpenSea, Rarible and most marketplaces.
 */
contract PlucoOriginals is ERC721, ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard {
    uint256 public immutable maxSupply;
    uint256 public immutable mintPrice;
    uint256 public immutable maxPerWallet;

    uint256 public totalMinted;
    bool public saleOpen;
    string public provenance;

    /// @notice PLUCO's cut of every primary mint, paid out immediately to the treasury.
    address public treasury;
    uint96 public feeBps;

    mapping(address => uint256) public mintedBy;

    event SaleToggled(bool open);
    event ProvenanceSet(string provenanceHash);
    event ArtMinted(address indexed to, uint256 indexed tokenId, string uri);
    event FeePaid(address indexed treasury, uint256 amount);
    event TreasurySet(address treasury);
    event FeeSet(uint96 feeBps);

    error SaleClosed();
    error SoldOut();
    error WrongPrice(uint256 expected, uint256 sent);
    error WalletLimit(uint256 limit);
    error BadSupply();
    error FeeTooHigh();
    error FeeTransferFailed();

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        uint256 mintPrice_,
        uint256 maxPerWallet_,
        address owner_,
        address royaltyReceiver_,
        address treasury_,
        uint96 feeBps_
    ) ERC721(name_, symbol_) Ownable(owner_) {
        if (maxSupply_ == 0) revert BadSupply();
        if (feeBps_ > 1_000) revert BadSupply();
        treasury = treasury_;
        feeBps = feeBps_;
        maxSupply = maxSupply_;
        mintPrice = mintPrice_;
        maxPerWallet = maxPerWallet_ == 0 ? maxSupply_ : maxPerWallet_;
        _setDefaultRoyalty(royaltyReceiver_, 750); // 7.5%
    }

    /// @notice Mint one piece. Each token gets its own metadata URI.
    function mint(string calldata uri) external payable nonReentrant returns (uint256 tokenId) {
        if (!saleOpen) revert SaleClosed();
        if (totalMinted >= maxSupply) revert SoldOut();
        if (msg.value != mintPrice) revert WrongPrice(mintPrice, msg.value);
        if (mintedBy[msg.sender] >= maxPerWallet) revert WalletLimit(maxPerWallet);

        tokenId = ++totalMinted;
        mintedBy[msg.sender] += 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit ArtMinted(msg.sender, tokenId, uri);

        uint256 fee = (mintPrice * feeBps) / 10_000;
        if (fee > 0) {
            (bool ok, ) = payable(treasury).call{value: fee}("");
            if (!ok) revert FeeTransferFailed();
            emit FeePaid(treasury, fee);
        }
    }

    /// @notice Owner reserves a piece (studio archive, collabs, giveaways).
    function ownerMint(address to, string calldata uri) external onlyOwner returns (uint256 tokenId) {
        if (totalMinted >= maxSupply) revert SoldOut();
        tokenId = ++totalMinted;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit ArtMinted(to, tokenId, uri);
    }

    function setSaleOpen(bool open) external onlyOwner {
        saleOpen = open;
        emit SaleToggled(open);
    }

    /// @notice Freeze a hash of the artwork files so buyers can verify nothing was swapped.
    function setProvenance(string calldata provenanceHash) external onlyOwner {
        provenance = provenanceHash;
        emit ProvenanceSet(provenanceHash);
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function setTreasury(address treasury_) external onlyOwner {
        treasury = treasury_;
        emit TreasurySet(treasury_);
    }

    /// @notice Primary mint fee, in basis points. Hard-capped at 10%.
    function setFeeBps(uint96 feeBps_) external onlyOwner {
        if (feeBps_ > 1_000) revert FeeTooHigh();
        feeBps = feeBps_;
        emit FeeSet(feeBps_);
    }

    function withdraw(address payable to) external onlyOwner nonReentrant {
        (bool ok, ) = to.call{value: address(this).balance}("");
        require(ok, "withdraw failed");
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
