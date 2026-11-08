// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {PlucoRegistry} from "../src/PlucoRegistry.sol";
import {PlucoOriginals} from "../src/PlucoOriginals.sol";

/// Minimal ERC-721 with no owner(): anyone may register it (community drops).
contract NoOwnerERC721 {
    mapping(uint256 => address) public ownerOf;

    function supportsInterface(bytes4 id) external pure returns (bool) {
        return id == 0x80ac58cd;
    }

    function mint(address to) external {
        ownerOf[1] = to;
    }
}

/// Not a token at all.
contract NotAToken {
    function supportsInterface(bytes4) external pure returns (bool) {
        return false;
    }
}

contract PlucoRegistryTest is Test {
    PlucoRegistry internal registry;
    PlucoOriginals internal collection;

    address internal owner = address(this);
    address internal artist = makeAddr("artist");
    address internal stranger = makeAddr("stranger");
    address internal treasury = makeAddr("treasury");

    function setUp() public {
        registry = new PlucoRegistry(owner);
        collection = new PlucoOriginals(
            "PLUCO Originals",
            "PLUCO",
            10,
            0.01 ether,
            2,
            artist,
            artist,
            treasury,
            250
        );
    }

    // ---- registration -------------------------------------------------
    function test_RegisterRecordsTheCollection() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "ipfs://collection");

        PlucoRegistry.Collection memory c = registry.get(address(collection));
        assertEq(c.collection, address(collection));
        assertEq(c.artist, artist, "artist is the caller");
        assertEq(c.name, "PLUCO Originals");
        assertEq(c.category, "Digital Art");
        assertEq(c.metadataURI, "ipfs://collection");
        assertTrue(c.active, "active on registration");
        assertGt(c.registeredAt, 0);
        assertTrue(registry.isRegistered(address(collection)));
        assertTrue(registry.isActive(address(collection)));
        assertEq(registry.artistOf(address(collection)), artist);
        assertEq(registry.collectionCount(), 1);
    }

    function test_RegisterEmitsEvent() public {
        vm.expectEmit(true, true, false, true, address(registry));
        emit PlucoRegistry.CollectionRegistered(address(collection), artist, "PLUCO Originals", "Digital Art");

        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");
    }

    function test_RevertWhen_ZeroAddress() public {
        vm.prank(artist);
        vm.expectRevert(PlucoRegistry.ZeroAddress.selector);
        registry.register(address(0), "x", "y", "");
    }

    function test_RevertWhen_NotERC721() public {
        NotAToken nope = new NotAToken();
        vm.prank(artist);
        vm.expectRevert(PlucoRegistry.NotERC721.selector);
        registry.register(address(nope), "x", "y", "");
    }

    function test_RevertWhen_CallerIsNotTheCollectionOwner() public {
        // PlucoOriginals exposes owner() = artist, so only the artist may register it.
        vm.prank(stranger);
        vm.expectRevert(PlucoRegistry.NotArtist.selector);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");
    }

    function test_RevertWhen_AlreadyRegistered() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");

        vm.prank(artist);
        vm.expectRevert(
            abi.encodeWithSelector(PlucoRegistry.AlreadyRegistered.selector, address(collection))
        );
        registry.register(address(collection), "Again", "Digital Art", "");
    }

    function test_AnyoneCanRegisterACollectionWithoutAnOwner() public {
        NoOwnerERC721 community = new NoOwnerERC721();
        vm.prank(stranger);
        registry.register(address(community), "Community Drop", "Photography", "");

        assertEq(registry.artistOf(address(community)), stranger);
    }

    // ---- status -------------------------------------------------------
    function test_ArtistCanDelistAndRelist() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");

        vm.prank(artist);
        registry.setActive(address(collection), false);
        assertFalse(registry.isActive(address(collection)));

        vm.prank(artist);
        registry.setActive(address(collection), true);
        assertTrue(registry.isActive(address(collection)));
    }

    function test_RegistryOwnerCanDelistOnBehalfOfArtist() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");

        registry.setActive(address(collection), false);
        assertFalse(registry.isActive(address(collection)));
    }

    function test_RevertWhen_StrangerSetsActive() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");

        vm.prank(stranger);
        vm.expectRevert(PlucoRegistry.NotArtist.selector);
        registry.setActive(address(collection), false);
    }

    function test_RevertWhen_SetActiveOnUnknownCollection() public {
        vm.expectRevert(
            abi.encodeWithSelector(PlucoRegistry.NotFound.selector, address(collection))
        );
        registry.setActive(address(collection), false);
    }

    function test_ArtistCanUpdateMetadataURI() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "ipfs://old");

        vm.prank(artist);
        registry.setMetadataURI(address(collection), "ipfs://new");

        assertEq(registry.get(address(collection)).metadataURI, "ipfs://new");
    }

    function test_RevertWhen_StrangerUpdatesMetadata() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "ipfs://old");

        vm.prank(stranger);
        vm.expectRevert(PlucoRegistry.NotArtist.selector);
        registry.setMetadataURI(address(collection), "ipfs://hijacked");
    }

    function test_ForceDelistIsOwnerOnly() public {
        vm.prank(artist);
        registry.register(address(collection), "PLUCO Originals", "Digital Art", "");

        vm.prank(stranger);
        vm.expectRevert(); // OZ Ownable: OwnableUnauthorizedAccount
        registry.forceDelist(address(collection));

        registry.forceDelist(address(collection));
        assertFalse(registry.isActive(address(collection)));
    }

    // ---- paging -------------------------------------------------------
    function _registerThree() internal returns (address a, address b, address c) {
        a = address(new PlucoOriginals("A", "A", 1, 0, 0, artist, artist, treasury, 0));
        b = address(new PlucoOriginals("B", "B", 1, 0, 0, artist, artist, treasury, 0));
        c = address(new PlucoOriginals("C", "C", 1, 0, 0, artist, artist, treasury, 0));

        vm.startPrank(artist);
        registry.register(a, "A", "Digital Art", "");
        registry.register(b, "B", "Digital Art", "");
        registry.register(c, "C", "Digital Art", "");
        vm.stopPrank();
    }

    function test_PageReturnsNewestFirst() public {
        (address a, address b, address c) = _registerThree();

        PlucoRegistry.Collection[] memory page = registry.page(0, 2);
        assertEq(page.length, 2);
        assertEq(page[0].collection, c, "newest first");
        assertEq(page[1].collection, b);

        PlucoRegistry.Collection[] memory rest = registry.page(2, 2);
        assertEq(rest.length, 1);
        assertEq(rest[0].collection, a);
    }

    function test_PageBeyondTheEndIsEmpty() public {
        _registerThree();
        assertEq(registry.page(99, 10).length, 0);
        assertEq(registry.page(0, 0).length, 0, "zero limit returns nothing");
    }

    function test_CollectionsByArtist() public {
        (address a,, address c) = _registerThree();
        address[] memory mine = registry.collectionsByArtist(artist);
        assertEq(mine.length, 3);
        assertEq(mine[0], a);
        assertEq(mine[2], c);
        assertEq(registry.collectionsByArtist(stranger).length, 0);
    }

    function test_IsActiveFalseForUnknownCollection() public view {
        assertFalse(registry.isActive(address(0xdead)));
        assertFalse(registry.isRegistered(address(0xdead)));
    }
}
