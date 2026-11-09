// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {VectolithRegistry} from "../src/VectolithRegistry.sol";
import {VectolithOriginals} from "../src/VectolithOriginals.sol";
import {VectolithMarketplace} from "../src/VectolithMarketplace.sol";

/**
 * Base mainnet deploy + live seed.
 *
 * Env:
 *   DEPLOYER_KEY  key that pays gas and holds ownership during the test
 *   OWNER         address that receives treasury fees, royalties, and final ownership
 *   BUYER         address funded for the settlement leg (optional)
 *
 * Run:
 *   DEPLOYER_KEY=... OWNER=0x... BUYER=0x... \
 *   forge script script/DeployMainnet.s.sol --rpc-url https://mainnet.base.org --broadcast
 *
 * Ownership is handed to OWNER in a separate step (TransferOwnership.s.sol) once the
 * live mint/list/buy/withdraw sequence has settled, because opening the sale, minting
 * the reference piece and withdrawing need an owner that can sign here.
 */
contract DeployMainnet is Script {
    function run() external {
        uint256 pk = vm.envUint("DEPLOYER_KEY");
        address deployer = vm.addr(pk);
        address owner = vm.envAddress("OWNER");

        vm.startBroadcast(pk);

        VectolithRegistry registry = new VectolithRegistry(deployer);
        VectolithOriginals art = new VectolithOriginals(
            "VECTOLITH Originals",
            "VECTOLITH",
            10,
            0.0005 ether,
            3,
            deployer,
            owner, // royalty receiver
            owner, // mint fee treasury
            250 // 2.5%
        );
        VectolithMarketplace market = new VectolithMarketplace(deployer, registry, owner, 250);

        registry.register(address(art), "VECTOLITH Originals", "Digital Art", "ipfs://vectolith/originals.json");

        uint256 tokenId = art.ownerMint(deployer, "ipfs://vectolith/piece-1.json");
        art.setSaleOpen(true);
        art.setProvenance("vectolith-originals-v1");
        art.setApprovalForAll(address(market), true);

        market.list(address(art), tokenId, 0.001 ether);

        vm.stopBroadcast();

        console.log("registry", address(registry));
        console.log("originals", address(art));
        console.log("marketplace", address(market));
        console.log("tokenId", tokenId);
        console.log("owner", owner);
        console.log("deployer", deployer);
    }
}
