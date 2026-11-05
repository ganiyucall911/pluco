// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {PlucoRegistry} from "../src/PlucoRegistry.sol";
import {PlucoOriginals} from "../src/PlucoOriginals.sol";
import {PlucoMarketplace} from "../src/PlucoMarketplace.sol";

/// Local verification seed: deploys the protocol, registers a collection and lists
/// one piece so the gallery read layer can be exercised end to end.
///   DEPLOYER_KEY=... forge script script/LocalSeed.s.sol --rpc-url <rpc> --broadcast
contract LocalSeed is Script {
    function run() external {
        uint256 pk = vm.envUint("DEPLOYER_KEY");
        address deployer = vm.addr(pk);

        vm.startBroadcast(pk);
        PlucoRegistry registry = new PlucoRegistry(deployer);
        PlucoOriginals art = new PlucoOriginals(
            "PLUCO Originals", "PLUCO", 10, 0.1 ether, 3, deployer, deployer, deployer, 250
        );
        PlucoMarketplace market = new PlucoMarketplace(deployer, registry, deployer, 250);

        registry.register(address(art), "PLUCO Originals", "Digital Art", "ipfs://collection.json");
        uint256 id = art.ownerMint(deployer, "ipfs://piece-1.json");
        art.setSaleOpen(true);
        art.setApprovalForAll(address(market), true);
        market.list(address(art), id, 1 ether);
        vm.stopBroadcast();

        console.log("registry", address(registry));
        console.log("originals", address(art));
        console.log("marketplace", address(market));
    }
}
