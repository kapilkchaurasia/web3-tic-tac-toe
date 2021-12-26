import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import GameManager from './artifacts/contracts/GameManager.sol/GameManager.json'
import BoardManager from './artifacts/contracts/ThreeInARow.sol/ThreeInARow.json'

const gameManagerAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    const [gameBoardAddress, setGameBoardAddress] = useState()
    const [gameBoard, setGameBoard] = useState()
    const [gameBoardAddressP2, setGameBoardAddressP2] = useState()
    const [gameBoardP2, setGameBoardP2] = useState()
    let gameManager = new ethers.Contract(gameManagerAddress, GameManager.abi, provider)

    async function startNewGame() {
        try {
            const data = await gameManager.getGameBoardAddress()
            console.log('data: ', data)
            setGameBoardAddress(data)
            console.log('gameBoardAddress: ', gameBoardAddress)
            let x  = new ethers.Contract(data, BoardManager.abi, provider)
            setGameBoard(x)
        } catch(err){
            console.log("Error: ", err)
        }
    }

    async function fetchPlayer1() {
        try {
            const data = await gameBoard.getPlayer1()
            console.log('data: ', data)
        } catch(err){
            console.log("Error: ", err)
        }
    }

    async function getBoard() {
        try {
            const data = await gameBoard.getBoard()
            console.log('data: ', data)
        } catch(err){
            console.log("Error: ", err)
        }
    }

    async function joinTheGame() {
        try {
            console.log('gameBoardAddressP2: ', gameBoardAddressP2)
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log({ account })
            const signer = provider.getSigner()
            let x = new ethers.Contract(gameBoardAddressP2, BoardManager.abi, signer)
            setGameBoardP2(x)
            await x.joinTheGame();
        } catch(err){
            console.log("Error: ", err)
        }
    }

    async function fetchPlayer2() {
        try {
            const data = await gameBoardP2.getPlayer2()
            console.log('data: ', data)
        } catch(err){
            console.log("Error: ", err)
        }
    }

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={startNewGame}>Start Game</button>
            <button onClick={fetchPlayer1}>Fetch Player1</button>
            <button onClick={getBoard}>Show board</button>
            <button onClick={joinTheGame}>Join the game</button>
            <input onChange={e => setGameBoardAddressP2(e.target.value)} placeholder="Set greeting" />
            <button onClick={fetchPlayer2}>Fetch Player2</button>
        </header>
      </div>
  );
}

export default App;
