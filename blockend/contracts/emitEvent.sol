// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract EmitEvent {
    event Transfer(address indexed from, address indexed to, uint256 value);

    function emitEvent() public {
        emit Transfer(msg.sender, msg.sender, 0);
    }
}