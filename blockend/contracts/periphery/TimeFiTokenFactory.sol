// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "../core/TimeFiToken.sol";
import "../interfaces/IERC20Timeable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract TimeFi__TokenFactory is Initializable {
    using Clones for address;

    address immutable public timeFiTokenImplementation;
    address[] public allTimeFiTokens;
    mapping(address => address) public issuerToToken;

    constructor (address _timeFiTokenImplementation) {
        timeFiTokenImplementation = _timeFiTokenImplementation;
    }

    function createToken(string memory _issuerName, string memory _issuerSymbol, uint _fixedPrice) external {
        require(issuerToToken[tx.origin] == address(0), "TimeFi__TokenFactory: Token already created");
        address tokenContract = timeFiTokenImplementation.clone();
        TimeFiToken(tokenContract).initializeToken(_issuerName, _issuerSymbol, _fixedPrice);
        issuerToToken[tx.origin] = tokenContract;
        allTimeFiTokens.push(tokenContract);
    }
    
    // TODO: Test this function
    function createCustomizedToken(address customizedToken, string memory _issuerName, string memory _issuerSymbol, uint _fixedPrice) external {
        require(issuerToToken[tx.origin] == address(0), "TimeFi__TokenFactory: Token already created");
        require(IERC165(customizedToken).supportsInterface(type(IERC20Timeable).interfaceId), "TimeFi__TokenFactory: Token does not support IERC20Timeable interface");
        address tokenContract = customizedToken.clone();
        TimeFiToken(tokenContract).initializeToken(_issuerName, _issuerSymbol, _fixedPrice);
        issuerToToken[tx.origin] = tokenContract;
        allTimeFiTokens.push(tokenContract);
    }
}