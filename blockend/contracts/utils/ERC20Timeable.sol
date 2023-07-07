// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "../mocks/clonableERC20/ERC20Clonable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "../interfaces/IERC20Timeable.sol";

contract ERC20Timeable is ERC20Clonable, Initializable, ERC165 {
    uint256 public constant TIME_REPRESENTATION = 1 minutes;

    

    function initialize(string memory _name, string memory _symbol) internal {
        initialize_root(_name, _symbol); 
    }

    /// TODO: Add Slashing, burning, transferring, minting, royalties
    function burnTimeTokens(uint256 burnRate, address account) external virtual {
        uint256 balance = balanceOf(account);
        uint256 burnAmount = balance * burnRate / 100;
        _burn(account, burnAmount);
    }

    // Slash tokens from an account when doesn't comply to protocols terms
    function slashTimeTokens(uint256 slashRate, address account) external virtual {
        uint256 balance = balanceOf(account);
        uint256 slashAmount = balance * slashRate / 100;
        _burn(account, slashAmount);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC165) returns (bool) {
        return interfaceId == type(IERC20Timeable).interfaceId || super.supportsInterface(interfaceId);
    }
}
