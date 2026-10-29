// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IOwnableLike {
    function owner() external view returns (address);
}

/**
 * @title PlucoRegistry
 * @notice The open index that makes PLUCO a protocol instead of a single mint.
 *
 *         Any ERC-721 deployed by anyone on Base can be registered here. The registry
 *         does not custody art, take a fee or gate creativity: it records who the artist
 *         is, what the collection is, and whether it is currently shown on PLUCO.
 *         Marketplaces, galleries and indexers read from this one contract.
 */
contract PlucoRegistry is Ownable {
    struct Collection {
        address collection;
        address artist;
        string name;
        string category;
        string metadataURI;
        uint64 registeredAt;
        bool active;
    }

    mapping(address => Collection) private _collections;
    address[] private _all;
    mapping(address => address[]) private _byArtist;

    event CollectionRegistered(address indexed collection, address indexed artist, string name, string category);
    event CollectionStatusChanged(address indexed collection, bool active);
    event CollectionMetadataUpdated(address indexed collection, string metadataURI);

    error ZeroAddress();
    error NotERC721();
    error AlreadyRegistered(address collection);
    error NotFound(address collection);
    error NotArtist();

    constructor(address owner_) Ownable(owner_) {}

    /// @notice Register a collection you own. Reverts if the address is not ERC-721,
    ///         or if the contract exposes owner() and it is not you.
    function register(
        address collection,
        string calldata name,
        string calldata category,
        string calldata metadataURI
    ) external returns (bool) {
        if (collection == address(0)) revert ZeroAddress();
        if (_collections[collection].collection != address(0)) revert AlreadyRegistered(collection);
        if (!IERC165(collection).supportsInterface(0x80ac58cd)) revert NotERC721();

        // If the collection is ownable, only its owner may register it. Contracts without
        // an owner() (e.g. immutable community drops) can be registered by anyone.
        try IOwnableLike(collection).owner() returns (address collectionOwner) {
            if (collectionOwner != msg.sender) revert NotArtist();
        } catch {}

        _collections[collection] = Collection({
            collection: collection,
            artist: msg.sender,
            name: name,
            category: category,
            metadataURI: metadataURI,
            registeredAt: uint64(block.timestamp),
            active: true
        });
        _all.push(collection);
        _byArtist[msg.sender].push(collection);

        emit CollectionRegistered(collection, msg.sender, name, category);
        return true;
    }

    /// @notice Artist delists or relists their collection.
    function setActive(address collection, bool active) external {
        Collection storage c = _collections[collection];
        if (c.collection == address(0)) revert NotFound(collection);
        if (c.artist != msg.sender && owner() != msg.sender) revert NotArtist();
        c.active = active;
        emit CollectionStatusChanged(collection, active);
    }

    function setMetadataURI(address collection, string calldata metadataURI) external {
        Collection storage c = _collections[collection];
        if (c.collection == address(0)) revert NotFound(collection);
        if (c.artist != msg.sender) revert NotArtist();
        c.metadataURI = metadataURI;
        emit CollectionMetadataUpdated(collection, metadataURI);
    }

    function get(address collection) external view returns (Collection memory) {
        return _collections[collection];
    }

    function isRegistered(address collection) external view returns (bool) {
        return _collections[collection].collection != address(0);
    }

    /// @notice True only when registered and the artist still lists it.
    function isActive(address collection) public view returns (bool) {
        return _collections[collection].active;
    }

    function artistOf(address collection) external view returns (address) {
        return _collections[collection].artist;
    }

    function collectionCount() external view returns (uint256) {
        return _all.length;
    }

    function collectionsByArtist(address artist) external view returns (address[] memory) {
        return _byArtist[artist];
    }

    /// @notice Paged read for galleries and indexers: newest first.
    function page(uint256 offset, uint256 limit) external view returns (Collection[] memory out) {
        uint256 total = _all.length;
        if (offset >= total || limit == 0) return new Collection[](0);
        uint256 end = offset + limit;
        if (end > total) end = total;
        out = new Collection[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            out[i - offset] = _collections[_all[total - 1 - i]];
        }
    }

    /// @notice Emergency removal for contracts that turn malicious (registry owner only).
    function forceDelist(address collection) external onlyOwner {
        Collection storage c = _collections[collection];
        if (c.collection == address(0)) revert NotFound(collection);
        c.active = false;
        emit CollectionStatusChanged(collection, false);
    }
}
