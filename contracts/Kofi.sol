// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Kofi {
    address payable public owner;

    constructor() {
        owner = payable(0xFCF1f267Fd45666A7c42e63cdafa340ECa84B96A);
    }

    receive() external payable {
        require(msg.value > 0, "You need to send some Ether");
        owner.transfer(msg.value);
    }


    function sentToOwner() public payable {
        require(msg.value > 0, "You need to send something");
        owner.transfer(msg.value);
    }
}
