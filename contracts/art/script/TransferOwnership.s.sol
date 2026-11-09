// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {VectolithRegistry} from "../src/VectolithRegistry.sol";
import {VectolithOriginals} from "../src/VectolithOriginals.sol";
import {VectolithMarketplace} from "../src/VectolithMarketplace.sol";

/**
 * Hand every contract to the owner after the live settlement sequence.
 *
 * Env:
 *   DEPLOYER_KEY  current owner key (the sandbox deployer)
 *   OWNER         final owner address
 *   REGISTRY, ORIGINALS, MARKETPLACE   deployed addresses
 */
contract TransferOwnership is Script {
    function run() external {
        uint256 pk = vm.envUint("DEPLOYER_KEY");
        address owner = vm.envAddress("OWNER");

        VectolithRegistry registry = VectolithRegistry(vm.envAddress("REGISTRY"));
        VectolithOriginals art = VectolithOriginals(payable(vm.envAddress("ORIGINALS")));
        VectolithMarketplace market = VectolithMarketplace(payable(vm.envAddress("MARKETPLACE")));

        vm.startBroadcast(pk);
        registry.transferOwnership(owner);
        art.transferOwnership(owner);
        market.transferOwnership(owner);
        vm.stopBroadcast();

        console.log("ownership handed to", owner);
        console.log("registry owner", registry.owner());
        console.log("originals owner", art.owner());
        console.log("marketplace owner", market.owner());
    }
}
