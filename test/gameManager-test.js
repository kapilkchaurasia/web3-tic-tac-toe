const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new GM once it's changed", async function () {
    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy();
    await gameManager.deployed();
    gameBoardAddress = await gameManager.getGameBoardAddress();

    const GameBoard = await ethers.getContractFactory("ThreeInARow");
    const gameBoard = await GameBoard.attach(gameBoardAddress);
    expect(await gameBoard.getPlayer1()).to.not.equal(null);
    let x= await gameBoard.getPlayer1();
    console.log("player1: ", x)

    await gameBoard.joinTheGame();
    expect(await gameBoard.getPlayer2()).to.not.equal(null);
    console.log("player2: ", x)
  });
  
});
