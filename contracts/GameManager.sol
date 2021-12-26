// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;
import "./ThreeInARow.sol";

contract GameManager {
    
    address gameBoardAddress;

    constructor() payable {
        //require(msg.value > 1, "mini. entry is 1 wei");
        ThreeInARow board = new ThreeInARow(msg.sender);
        gameBoardAddress = address(board);
    }
    
    function getGameBoardAddress() external view returns (address){
        return gameBoardAddress;
    }
}
