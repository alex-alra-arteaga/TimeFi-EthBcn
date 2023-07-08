// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../mocks/clonableERC20/IERC20.sol";
import "../mocks/clonableERC20/extensions/IERC20Metadata.sol";

interface IERC20Clonable is IERC20, IERC20Metadata {
    function initialize_root(string memory name_, string memory symbol_) external;
}
interface IERC20Timeable is IERC20Clonable {
    function burnTimeTokens(uint256 burnRate, address account) external;
    function slashTimeTokens(uint256 slashRate, address account) external;
}
