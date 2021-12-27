const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tic Tac Tao", function () {
  it("Should return the new GM once it's changed", async function () {
    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy();
    await gameManager.deployed();
    gameBoardAddress = await gameManager.getGameBoardAddress();

    const GameBoard = await ethers.getContractFactory("ThreeInARow");
    const gameBoard = await GameBoard.attach(gameBoardAddress);
    expect(await gameBoard.getPlayer1()).to.not.equal(null);

    await gameBoard.joinTheGame();
    expect(await gameBoard.getPlayer2()).to.not.equal(null);
  });
  
});
