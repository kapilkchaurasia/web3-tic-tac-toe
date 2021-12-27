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
    const [move, setMove] = useState()
    const [game, setGame] = useState([[null, null, null],
        [null, null, null],
        [null, null, null]])
    const [playerName, setPlayerName] = useState("Untitled")
    
    let gameManager = new ethers.Contract(gameManagerAddress, GameManager.abi, provider)

    async function startNewGame() {
        try {
            const data = await gameManager.getGameBoardAddress()
            console.log('data: ', data)
            setGameBoardAddress(data)
            console.log('gameBoardAddress: ', gameBoardAddress)
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const signer = provider.getSigner()
            let contract  = new ethers.Contract(data, BoardManager.abi, signer)
            setGameBoard(contract)
            setPlayerName(account)
        } catch(err){
            console.log("Error: ", err)
        }
    }

    async function getBoard() {
        try {
            const data = await gameBoard.getBoard()
            setGame(data)
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
            let contract = new ethers.Contract(gameBoardAddressP2, BoardManager.abi, signer)
            setGameBoard(contract)
            const transaction = await contract.joinTheGame({value: 100000})
            await transaction.wait()
            setPlayerName(account)
        } catch(err){
            console.log("Error: ", err)
        }
    }
    
    async function makeAMove() {
        try {
            const transaction = await gameBoard.makeAMove(move.split(" "))
            await transaction.wait()
            console.log('data: ', transaction)
            await getBoard()
        } catch(err){
            console.log("Error: ", err)
            alert('wait for your turn');
        }
    }
    
    return (
      <div className="App">
        <header className="App-header">
            <p><b>Player Name: {playerName}</b></p>
            <button onClick={startNewGame}>Start Game</button>
            <button onClick={joinTheGame}>Join the game</button>
            <input onChange={e => setGameBoardAddressP2(e.target.value)} placeholder="Game Address" />
            <button onClick={makeAMove}>Make a move</button>
            <input onChange={e => setMove(e.target.value)} placeholder="0 2" />
            <div>
                <table>
                    <tbody>
                    {game.slice(0, game.length).map((item, index) => {
                        return (
                            <tr>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </header>
      </div>
  );
}
export default App;
