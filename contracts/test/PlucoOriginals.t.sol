// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {VectolithOriginals} from "../src/VectolithOriginals.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract VectolithOriginalsTest is Test {
    VectolithOriginals internal art;

    address internal owner = makeAddr("owner");
    address internal artist = makeAddr("artist");
    address internal collector = makeAddr("collector");
    address internal second = makeAddr("second");
    address internal treasury = makeAddr("treasury");

    uint256 internal constant SUPPLY = 5;
    uint256 internal constant PRICE = 0.1 ether;
    uint256 internal constant PER_WALLET = 2;
    uint96 internal constant FEE_BPS = 250; // 2.5%

    function setUp() public {
        art = new VectolithOriginals(
            "VECTOLITH Originals",
            "VECTOLITH",
            SUPPLY,
            PRICE,
            PER_WALLET,
            owner,
            artist,
            treasury,
            FEE_BPS
        );
        vm.deal(collector, 10 ether);
        vm.deal(second, 10 ether);
        vm.prank(owner);
        art.setSaleOpen(true);
    }

    // ---- constructor ---------------------------------------------------
    function test_ConstructorStoresTerms() public view {
        assertEq(art.name(), "VECTOLITH Originals");
        assertEq(art.symbol(), "VECTOLITH");
        assertEq(art.maxSupply(), SUPPLY);
        assertEq(art.mintPrice(), PRICE);
        assertEq(art.maxPerWallet(), PER_WALLET);
        assertEq(art.treasury(), treasury);
        assertEq(art.feeBps(), FEE_BPS);
        assertEq(art.owner(), owner);
        assertEq(art.totalMinted(), 0);
        assertEq(art.provenance(), "");
    }

    function test_DefaultRoyaltyIsSevenPointFivePercent() public view {
        (address receiver, uint256 amount) = IERC2981(address(art)).royaltyInfo(1, 1 ether);
        assertEq(receiver, artist);
        assertEq(amount, 0.075 ether, "7.5% of the sale price");
    }

    function test_ZeroMaxPerWalletMeansNoLimit() public {
        VectolithOriginals unlimited = new VectolithOriginals(
            "U", "U", 3, 0, 0, owner, artist, treasury, 0
        );
        assertEq(unlimited.maxPerWallet(), 3, "defaults to the supply");
    }

    function test_RevertWhen_SupplyIsZero() public {
        vm.expectRevert(VectolithOriginals.BadSupply.selector);
        new VectolithOriginals("Z", "Z", 0, PRICE, 1, owner, artist, treasury, 0);
    }

    function test_RevertWhen_ConstructorFeeExceedsCap() public {
        vm.expectRevert(VectolithOriginals.BadSupply.selector);
        new VectolithOriginals("Z", "Z", 1, PRICE, 1, owner, artist, treasury, 1001);
    }

    // ---- minting -------------------------------------------------------
    function test_MintTransfersTokenAndStoresURI() public {
        vm.prank(collector);
        uint256 id = art.mint{value: PRICE}("ipfs://piece-1");

        assertEq(id, 1);
        assertEq(art.ownerOf(1), collector);
        assertEq(art.tokenURI(1), "ipfs://piece-1", "each piece keeps its own URI");
        assertEq(art.totalMinted(), 1);
        assertEq(art.mintedBy(collector), 1);
    }

    function test_MintPaysTheTreasuryFeeImmediately() public {
        uint256 before = treasury.balance;
        vm.prank(collector);
        art.mint{value: PRICE}("ipfs://piece-1");

        uint256 expected = (PRICE * FEE_BPS) / 10_000; // 0.0025 ETH
        assertEq(treasury.balance - before, expected);
        assertEq(address(art).balance, PRICE - expected, "the rest stays claimable");
    }

    function test_MintWithZeroFeeSendsNothingToTreasury() public {
        vm.prank(owner);
        art.setFeeBps(0);

        uint256 before = treasury.balance;
        vm.prank(collector);
        art.mint{value: PRICE}("ipfs://piece-1");

        assertEq(treasury.balance, before);
        assertEq(address(art).balance, PRICE);
    }

    function test_RevertWhen_SaleIsClosed() public {
        vm.prank(owner);
        art.setSaleOpen(false);

        vm.prank(collector);
        vm.expectRevert(VectolithOriginals.SaleClosed.selector);
        art.mint{value: PRICE}("ipfs://piece-1");
    }

    function test_RevertWhen_PriceIsWrong() public {
        vm.prank(collector);
        vm.expectRevert(
            abi.encodeWithSelector(VectolithOriginals.WrongPrice.selector, PRICE, PRICE - 1)
        );
        art.mint{value: PRICE - 1}("ipfs://piece-1");
    }

    function test_RevertWhen_WalletLimitReached() public {
        vm.startPrank(collector);
        art.mint{value: PRICE}("ipfs://1");
        art.mint{value: PRICE}("ipfs://2");
        vm.expectRevert(
            abi.encodeWithSelector(VectolithOriginals.WalletLimit.selector, PER_WALLET)
        );
        art.mint{value: PRICE}("ipfs://3");
        vm.stopPrank();
    }

    function test_RevertWhen_SoldOut() public {
        for (uint256 i = 0; i < SUPPLY; i++) {
            address buyer = address(uint160(1000 + i));
            vm.deal(buyer, PRICE);
            vm.prank(buyer);
            art.mint{value: PRICE}("ipfs://piece");
        }
        assertEq(art.totalMinted(), SUPPLY);

        vm.prank(collector);
        vm.expectRevert(VectolithOriginals.SoldOut.selector);
        art.mint{value: PRICE}("ipfs://one-too-many");
    }

    function test_OwnerMintSkipsPaymentAndLimit() public {
        vm.prank(owner);
        uint256 id = art.ownerMint(second, "ipfs://archive");

        assertEq(id, 1);
        assertEq(art.ownerOf(1), second);
        assertEq(art.mintedBy(second), 0, "owner reserve does not touch the wallet count");
        assertEq(address(art).balance, 0, "no fee taken from the owner");
    }

    function test_RevertWhen_NonOwnerMints() public {
        vm.prank(collector);
        vm.expectRevert(); // OwnableUnauthorizedAccount
        art.ownerMint(collector, "ipfs://archive");
    }

    function test_RevertWhen_OwnerMintExceedsSupply() public {
        vm.startPrank(owner);
        for (uint256 i = 0; i < SUPPLY; i++) art.ownerMint(owner, "ipfs://a");
        vm.expectRevert(VectolithOriginals.SoldOut.selector);
        art.ownerMint(owner, "ipfs://b");
        vm.stopPrank();
    }

    // ---- owner controls ------------------------------------------------
    function test_SetProvenance() public {
        vm.prank(owner);
        art.setProvenance("sha256:abc123");
        assertEq(art.provenance(), "sha256:abc123");
    }

    function test_SetTreasuryRedirectsTheFee() public {
        address newTreasury = makeAddr("newTreasury");
        vm.prank(owner);
        art.setTreasury(newTreasury);
        assertEq(art.treasury(), newTreasury);

        vm.prank(collector);
        art.mint{value: PRICE}("ipfs://1");
        assertEq(newTreasury.balance, (PRICE * FEE_BPS) / 10_000);
    }

    function test_RevertWhen_FeeAboveTenPercent() public {
        vm.prank(owner);
        vm.expectRevert(VectolithOriginals.FeeTooHigh.selector);
        art.setFeeBps(1001);
    }

    function test_OwnerCanChangeRoyalty() public {
        vm.prank(owner);
        art.setDefaultRoyalty(second, 500);

        (address receiver, uint256 amount) = IERC2981(address(art)).royaltyInfo(1, 1 ether);
        assertEq(receiver, second);
        assertEq(amount, 0.05 ether);
    }

    function test_WithdrawSendsTheBalance() public {
        vm.prank(collector);
        art.mint{value: PRICE}("ipfs://1");

        uint256 expected = address(art).balance;
        uint256 before = artist.balance;

        vm.prank(owner);
        art.withdraw(payable(artist));

        assertEq(artist.balance - before, expected);
        assertEq(address(art).balance, 0);
    }

    function test_RevertWhen_NonOwnerWithdraws() public {
        vm.prank(collector);
        art.mint{value: PRICE}("ipfs://1");

        vm.prank(collector);
        vm.expectRevert();
        art.withdraw(payable(collector));
    }

    // ---- interface support ---------------------------------------------
    function test_SupportsERC721AndRoyaltyInterfaces() public view {
        assertTrue(art.supportsInterface(0x80ac58cd), "ERC-721");
        assertTrue(art.supportsInterface(0x5b5e139f), "ERC-721 metadata");
        assertTrue(art.supportsInterface(0x2a55205a), "ERC-2981");
        assertTrue(art.supportsInterface(0x01ffc9a7), "ERC-165");
        assertFalse(art.supportsInterface(0xffffffff));
    }

    function test_RevertWhen_TokenURIMissing() public {
        vm.expectRevert();
        art.tokenURI(999);
    }
}
