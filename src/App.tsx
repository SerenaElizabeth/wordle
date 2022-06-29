import React, { useState } from 'react';
import './App.css';
import Game from './Components/Game';

export interface WordObj {
  wordArray:string[]
}


const App: React.FC = () => {
  
  const [gameIsOver, setGameIsOver] = useState(false)

  function startGame() {
    setGameIsOver(false)

  }

  const wordList = ["funky", "mouse", "plant", "crime", "night"];
  let newWordArray:WordObj = {
      wordArray: Array.from(wordList[Math.floor(Math.random() * wordList.length)]) //gets random word, creates array from letters
    }


  return (
    <div className="App">
      {gameIsOver && <button onClick={startGame}>Start Game</button>}
      {!gameIsOver && <Game wordArray={newWordArray.wordArray} />}

    </div>
  );
}

export default App;
