// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "../periphery/TimeFiTokenFactory.sol";
import "../core/TimeFiCore.sol";

contract TimeFiIssuerAccount is Initializable {

    address constant public timeFiTokenFactory = 0x5FbDB2315678afecb367f032d93F642f64180aa3; // TODO: Change this address
    address constant public timeFiCore = 0x5FbDB2315678afecb367f032d93F642f64180aa3; // TODO: Change this address

    string public name;
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function initialize(string memory _name) external initializer {
        owner = tx.origin;
        name = _name;
    }

    // SLOTS
    // create slots
    // business logic for slots (adquiring, selling, etc)
    // get slots
    // get priceFeed with xSwap Oracle

    function mintTimeWithETH(uint amount) external payable {
        address issuerToken = TimeFi__TokenFactory(timeFiTokenFactory).issuerToToken(owner);
        require(issuerToken != address(0), "TimeFiIssuerAccount: Issuer does not have a token");
        require(TimeFiToken(issuerToken).fixedPrice() * amount < msg.value, "TimeFiIssuerAccount: Insufficient funds");
        TimeFiToken(issuerToken).mintTime(amount);
    }

    function mintTimeWithERC20(uint amount, address currency) external {
        address issuerToken = TimeFi__TokenFactory(timeFiTokenFactory).issuerToToken(owner);
        require(issuerToken != address(0), "TimeFiIssuerAccount: Issuer does not have a token");
        uint cost = TimeFiCore(timeFiCore)._getOracleQuote(amount, currency);
        require(TimeFiToken(issuerToken).fixedPrice() * amount < cost, "TimeFiIssuerAccount: Insufficient funds");
        TimeFiToken(issuerToken).mintTime(amount);
    }

}