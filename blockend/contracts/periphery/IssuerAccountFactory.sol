// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../core/TimeFi-IssuerAccount.sol";

contract TimeFi__IssuerAccountFactory {
    using Clones for address;

    address immutable public issuerAccountImplementation;
    address[] public allIssuerAccounts;
    mapping(address => address) public issuerToAccount;

    constructor (address _issuerAccountImplementation) {
        issuerAccountImplementation = _issuerAccountImplementation;
    }

    function createIssuerAccount(string memory name) external {
        address newIssuerAccount = issuerAccountImplementation.clone();
        TimeFiIssuerAccount(newIssuerAccount).initialize(name);
        issuerToAccount[tx.origin] = newIssuerAccount;
        allIssuerAccounts.push(newIssuerAccount);
    }
}