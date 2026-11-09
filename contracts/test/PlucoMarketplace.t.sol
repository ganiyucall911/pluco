// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {VectolithRegistry} from "../src/VectolithRegistry.sol";
import {VectolithMarketplace} from "../src/VectolithMarketplace.sol";
import {VectolithOriginals} from "../src/VectolithOriginals.sol";

contract VectolithMarketplaceTest is Test {
    VectolithRegistry internal registry;
    VectolithMarketplace internal market;
    VectolithOriginals internal art;

    address internal admin = address(this);
    address internal artist = makeAddr("artist");
    address internal seller = makeAddr("seller");
    address internal buyer = makeAddr("buyer");
    address internal treasury = makeAddr("treasury");

    uint256 internal constant MINT_PRICE = 0.1 ether;
    uint256 internal constant LIST_PRICE = 1 ether;
    uint96 internal constant MARKET_FEE_BPS = 250; // 2.5%

    function setUp() public {
        registry = new VectolithRegistry(admin);
        art = new VectolithOriginals(
            "VECTOLITH Originals", "VECTOLITH", 10, 0, 0, artist, artist, treasury, 0
        );
        market = new VectolithMarketplace(admin, registry, treasury, MARKET_FEE_BPS);

        // artist mints a piece to the seller, then registers the collection
        vm.prank(artist);
        art.ownerMint(seller, "ipfs://piece-1");
        vm.prank(artist);
        registry.register(address(art), "VECTOLITH Originals", "Digital Art", "");

        vm.deal(buyer, 10 ether);
        vm.prank(seller);
        art.setApprovalForAll(address(market), true);
    }

    // ---- listing rules -------------------------------------------------
    function test_ListRecordsTheListing() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        assertEq(id, 1);
        assertEq(market.listingCount(), 1);
        (, address collection, uint256 tokenId, uint256 price, bool active) = market.listings(id);
        assertEq(collection, address(art));
        assertEq(tokenId, 1);
        assertEq(price, LIST_PRICE);
        assertTrue(active);
    }

    function test_RevertWhen_CollectionIsNotActiveInRegistry() public {
        vm.prank(artist);
        registry.setActive(address(art), false);

        vm.prank(seller);
        vm.expectRevert(VectolithMarketplace.NotRegistered.selector);
        market.list(address(art), 1, LIST_PRICE);
    }

    function test_RevertWhen_SellerDoesNotOwnTheToken() public {
        vm.prank(buyer);
        vm.expectRevert(VectolithMarketplace.NotOwnerOfToken.selector);
        market.list(address(art), 1, LIST_PRICE);
    }

    function test_RevertWhen_MarketplaceIsNotApproved() public {
        vm.prank(seller);
        art.setApprovalForAll(address(market), false);

        vm.prank(seller);
        vm.expectRevert(VectolithMarketplace.NotApproved.selector);
        market.list(address(art), 1, LIST_PRICE);
    }

    function test_RevertWhen_PriceIsZero() public {
        vm.prank(seller);
        vm.expectRevert(VectolithMarketplace.BadPrice.selector);
        market.list(address(art), 1, 0);
    }

    function test_RelistingClosesThePreviousListing() public {
        vm.startPrank(seller);
        uint256 first = market.list(address(art), 1, LIST_PRICE);
        uint256 second = market.list(address(art), 1, 2 ether);
        vm.stopPrank();

        (,,,, bool firstActive) = market.listings(first);
        (,,, uint256 secondPrice, bool secondActive) = market.listings(second);
        assertFalse(firstActive, "old listing closed");
        assertTrue(secondActive);
        assertEq(secondPrice, 2 ether);
    }

    // ---- buying --------------------------------------------------------
    function test_BuyTransfersTokenAndSplitsTheMoney() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        uint256 royalty = (LIST_PRICE * 750) / 10_000; // 7.5%
        uint256 fee = (LIST_PRICE * MARKET_FEE_BPS) / 10_000; // 2.5%
        uint256 proceeds = LIST_PRICE - royalty - fee; // 90%

        vm.prank(buyer);
        market.buy{value: LIST_PRICE}(id);

        assertEq(art.ownerOf(1), buyer, "token moved to the buyer");
        assertEq(market.credits(artist), royalty, "artist royalty credited");
        assertEq(market.credits(treasury), fee, "protocol fee credited");
        assertEq(market.credits(seller), proceeds, "seller proceeds credited");
        assertEq(address(market).balance, LIST_PRICE, "held for pull withdrawals");

        (,,,, bool active) = market.listings(id);
        assertFalse(active, "listing closed after sale");
    }

    function test_BuyEmitsSoldWithTheSplit() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        uint256 royalty = (LIST_PRICE * 750) / 10_000;
        uint256 fee = (LIST_PRICE * MARKET_FEE_BPS) / 10_000;

        vm.expectEmit(true, true, false, true, address(market));
        emit VectolithMarketplace.Sold(id, buyer, LIST_PRICE, royalty, fee);

        vm.prank(buyer);
        market.buy{value: LIST_PRICE}(id);
    }

    function test_RevertWhen_ValueDoesNotMatchPrice() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        vm.prank(buyer);
        vm.expectRevert(
            abi.encodeWithSelector(VectolithMarketplace.WrongValue.selector, LIST_PRICE)
        );
        market.buy{value: LIST_PRICE - 1}(id);
    }

    function test_RevertWhen_BuyingAClosedListing() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);
        vm.prank(seller);
        market.cancel(id);

        vm.prank(buyer);
        vm.expectRevert(VectolithMarketplace.Inactive.selector);
        market.buy{value: LIST_PRICE}(id);
    }

    /// The marketplace is not custody: if the seller moves the token out after
    /// listing, the sale must fail rather than pay for something gone.
    function test_RevertWhen_SellerMovedTheTokenAfterListing() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        vm.prank(seller);
        art.transferFrom(seller, artist, 1);

        vm.prank(buyer);
        vm.expectRevert(VectolithMarketplace.NotOwnerOfToken.selector);
        market.buy{value: LIST_PRICE}(id);
    }

    // ---- seller actions ------------------------------------------------
    function test_SellerCanUpdateThePrice() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        vm.prank(seller);
        market.updatePrice(id, 3 ether);

        (,,, uint256 price,) = market.listings(id);
        assertEq(price, 3 ether);
    }

    function test_RevertWhen_StrangerUpdatesPrice() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        vm.prank(buyer);
        vm.expectRevert(VectolithMarketplace.NotSeller.selector);
        market.updatePrice(id, 0.5 ether);
    }

    function test_RevertWhen_StrangerCancels() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);

        vm.prank(buyer);
        vm.expectRevert(VectolithMarketplace.NotSeller.selector);
        market.cancel(id);
    }

    // ---- withdrawals (pull pattern) ------------------------------------
    function test_WithdrawPaysOutAndZeroesTheCredit() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);
        vm.prank(buyer);
        market.buy{value: LIST_PRICE}(id);

        uint256 owed = market.credits(seller);
        uint256 before = seller.balance;

        vm.prank(seller);
        market.withdraw();

        assertEq(seller.balance - before, owed);
        assertEq(market.credits(seller), 0);
    }

    function test_RevertWhen_NothingToWithdraw() public {
        vm.prank(seller);
        vm.expectRevert(VectolithMarketplace.NothingToWithdraw.selector);
        market.withdraw();
    }

    function test_RevertWhen_WithdrawingTwice() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);
        vm.prank(buyer);
        market.buy{value: LIST_PRICE}(id);

        vm.prank(seller);
        market.withdraw();

        vm.prank(seller);
        vm.expectRevert(VectolithMarketplace.NothingToWithdraw.selector);
        market.withdraw();
    }

    function test_EveryoneCanWithdrawTheirShare() public {
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, LIST_PRICE);
        vm.prank(buyer);
        market.buy{value: LIST_PRICE}(id);

        uint256 artistOwed = market.credits(artist);
        uint256 treasuryOwed = market.credits(treasury);

        vm.prank(artist);
        market.withdraw();
        vm.prank(treasury);
        market.withdraw();

        assertEq(artist.balance, artistOwed);
        assertEq(treasury.balance, treasuryOwed);
        assertEq(address(market).balance, market.credits(seller), "only seller credit remains");
    }

    // ---- admin ---------------------------------------------------------
    function test_RevertWhen_ConstructorFeeAboveFivePercent() public {
        vm.expectRevert(VectolithMarketplace.FeeTooHigh.selector);
        new VectolithMarketplace(admin, registry, treasury, 501);
    }

    function test_RevertWhen_ConstructorRegistryIsZero() public {
        vm.expectRevert(VectolithMarketplace.NotRegistered.selector);
        new VectolithMarketplace(admin, VectolithRegistry(address(0)), treasury, 250);
    }

    function test_SetFeeAndTreasury() public {
        market.setFee(500);
        assertEq(market.feeBps(), 500);
        market.setTreasury(buyer);
        assertEq(market.treasury(), buyer);

        vm.expectRevert(VectolithMarketplace.FeeTooHigh.selector);
        market.setFee(501);
    }

    function test_RevertWhen_StrangerSetsTheFee() public {
        vm.prank(buyer);
        vm.expectRevert();
        market.setFee(0);
    }

    function test_SetRegistryPointsElsewhere() public {
        VectolithRegistry other = new VectolithRegistry(admin);
        market.setRegistry(other);
        assertEq(address(market.registry()), address(other));
    }

    // ---- fuzz ----------------------------------------------------------
    function testFuzz_BuyAlwaysSplitsExactly(uint96 priceRaw) public {
        uint256 price = bound(uint256(priceRaw), 1 gwei, 100 ether);
        vm.deal(buyer, price); // the buyer can afford any fuzzed price
        vm.prank(seller);
        uint256 id = market.list(address(art), 1, price);

        uint256 royalty = (price * 750) / 10_000;
        uint256 fee = (price * MARKET_FEE_BPS) / 10_000;

        vm.prank(buyer);
        market.buy{value: price}(id);

        assertEq(market.credits(artist), royalty);
        assertEq(market.credits(treasury), fee);
        assertEq(market.credits(seller), price - royalty - fee);
        assertEq(
            market.credits(artist) + market.credits(treasury) + market.credits(seller),
            price,
            "nothing created or lost"
        );
        assertEq(address(market).balance, price);
    }
}
