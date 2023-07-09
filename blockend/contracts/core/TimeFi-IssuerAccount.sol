// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "../periphery/TimeFiTokenFactory.sol";
import "../core/TimeFiCore.sol";

contract TimeFiIssuerAccount is Initializable {

    address public timeFiTokenFactory; // TODO: Change this address
    address public timeFiCore; // TODO: Change this address

    string public name;
    address public owner;
    bool public isInitialized;
    address public uniqueInitializer = msg.sender;

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function initialize(string memory _name) external initializer {
        owner = tx.origin;
        name = _name;
    }

    function setFactoryAndCore(address _timeFiTokenFactory, address _timeFiCore) external {
        require(msg.sender == uniqueInitializer && !isInitialized, "TimeFiIssuerAccount: Only unique initializer can call this function");
        timeFiTokenFactory = _timeFiTokenFactory;
        timeFiCore = _timeFiCore;
        isInitialized = true;
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