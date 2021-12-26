// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

contract ThreeInARow {
    address  player1 ;
    address player2 ;
    uint8 moveCount ;
    string[3][3] board;
    
    constructor(address _player1) {
        player1 = _player1;
    }

    function getPlayer1() public view returns (address) {
        return player1;
    }

    function getPlayer2() public view returns (address) {
        return player2;
    }

    function joinTheGame() public {
        // require(msg.value > 1, "mini. entry is 1 wei");
        // require(player2 != address(0), "join other game");
        player2 = msg.sender;
    }
    
    function getBoard() public view returns (string[3][3] memory) {
        return board;
    }
    function makeAMove(uint8[] memory move) public {
        string memory symbol;
        if(moveCount % 2 == 0 && msg.sender == player2) {
            revert("wait la");
        } else if(moveCount % 2 != 0 && msg.sender == player1) {
            revert("wait la");
        }
        if(msg.sender == player1) {
            symbol = 'x';
        }else if(msg.sender == player2){
            symbol = 'o';
        }
        board[move[0]][move[1]] = symbol;
        moveCount ++;
    }
}
