import React, { useState } from 'react';
import { convertCompilerOptionsFromJson } from 'typescript';
import './App.css';
import Game from './Components/Game';
import Keyboard from './Components/Keyboard';

export interface IGameProps {
  wordArray:string[],
  gameIsOver:boolean,
  setGameOver: (gameIsOver:boolean)=> void
}

export interface IKeyboardProps {
  handleClick:(letter:string)=>void
}


const App: React.FC = () => {
  
  const [gameIsOver, setGameIsOver] = useState(false)

  function startGame() {
    setGameIsOver(false)
  }

  const wordList = ["funky", "mouse", "plant", "crime", "night"];
  let gameProps:IGameProps = {
      wordArray: Array.from(wordList[Math.floor(Math.random() * wordList.length)]), //gets random word, creates array from letters
      gameIsOver:false,
      setGameOver: (gameIsOver)=> setGameIsOver(!gameIsOver),
    }
    let keyboardProps:IKeyboardProps = {
     handleClick:(letter)=>console.log(letter) //TODO: update newArray with the letter that has been clicked on
    }


  return (
    <div className="App">
      {gameIsOver && <button onClick={startGame}>Start Again</button>}

      <Game gameIsOver={gameIsOver} setGameOver = {gameProps.setGameOver} wordArray={gameProps.wordArray} />
      <Keyboard handleClick={keyboardProps.handleClick}/>


    </div>
  );
}

export default App;
