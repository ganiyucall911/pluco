// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {PlucoRegistry} from "../src/PlucoRegistry.sol";
import {PlucoOriginals} from "../src/PlucoOriginals.sol";
import {PlucoMarketplace} from "../src/PlucoMarketplace.sol";

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

        PlucoRegistry registry = PlucoRegistry(vm.envAddress("REGISTRY"));
        PlucoOriginals art = PlucoOriginals(payable(vm.envAddress("ORIGINALS")));
        PlucoMarketplace market = PlucoMarketplace(payable(vm.envAddress("MARKETPLACE")));

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
