import React, { useState } from 'react';
import './App.css';
import Game from './Components/Game';

export interface Data {
  wordArray:string[],
  gameIsOver:boolean,
  setGameOver: (gameIsOver:boolean)=> void
}


const App: React.FC = () => {
  
  const [gameIsOver, setGameIsOver] = useState(false)

  function startGame() {
    setGameIsOver(false)
  }

  const wordList = ["funky", "mouse", "plant", "crime", "night"];
  let newData:Data = {
      wordArray: Array.from(wordList[Math.floor(Math.random() * wordList.length)]), //gets random word, creates array from letters
      gameIsOver:false,
      setGameOver: (gameIsOver)=> setGameIsOver(!gameIsOver)
    }


  return (
    <div className="App">
      {gameIsOver && <button onClick={startGame}>Start Again</button>}

      <Game gameIsOver={gameIsOver} setGameOver = {newData.setGameOver} wordArray={newData.wordArray} />

    </div>
  );
}

export default App;
