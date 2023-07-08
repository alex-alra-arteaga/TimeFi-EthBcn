// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import {ERC20Timeable} from "../utils/ERC20Timeable.sol";

contract TimeFiToken is ERC20Timeable {

    // The maximum amount of tokens that can be transferred per month
    uint256 public fixedPrice;
    uint256 public royaltyPercentage;
    uint256 private constant MAX_MONTHLY_MINT = TIME_REPRESENTATION * 60 * 24 * 30;
    address public issuer;
    uint public lastTimeMinted;

    modifier onlyIssuer {
        require(msg.sender == issuer, "TimeFiToken: Only issuer can call this function");
        _;
    }

    function initializeToken(string memory _issuerName, string memory _issuerSymbol, uint _fixedPrice) external initializer {
        require(_fixedPrice > 0, "TimeFiToken: Fixed price must be greater than 0");
        initialize_root(_issuerName, _issuerSymbol);
        issuer = tx.origin;
        fixedPrice = _fixedPrice;
    }

    function _transfer(address from, address to, uint256 amount) internal override {
        uint256 royalty = amount * royaltyPercentage / 100;
        super._transfer(from, issuer, royalty);
        super._transfer(from, to, amount - royalty);
    }

    function mintTime(uint amount) external {
        require(amount < MAX_MONTHLY_MINT, "TimeFiToken: Amount exceeds maximum monthly mint");
        require(block.timestamp > lastTimeMinted + 30 days, "TimeFiToken: Cannot mint more than once per month");
        _mint(issuer, amount);
    }

    function setFixedPrice(uint256 _fixedPrice) external onlyIssuer {
        fixedPrice = _fixedPrice;
    }

    function setRoyalties(uint _royaltyPercentage) external onlyIssuer {
        royaltyPercentage = _royaltyPercentage;
    }
}