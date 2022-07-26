import React, { useState } from 'react';
import { convertCompilerOptionsFromJson } from 'typescript';
import './App.css';
import Game from './Components/Game';

export interface IGameProps {
  wordArray:string[],
  gameIsOver:boolean,
  setGameOver: (gameIsOver:boolean)=> void
}



const App: React.FC = () => {
  
  const [gameIsOver, setGameIsOver] = useState(false)



  const wordList = ["funky", "mouse", "plant", "crime", "night"];
  let gameProps:IGameProps = {
      wordArray: Array.from(wordList[Math.floor(Math.random() * wordList.length)]), //gets random word, creates array from letters
      gameIsOver:false,
      setGameOver: (gameOver)=> setGameIsOver(gameOver),
    }
    


  return (
    <div className="App">
      {gameIsOver && <button onClick={()=>setGameIsOver(false)}>Start Again</button>}

      <Game gameIsOver={gameIsOver} setGameOver = {gameProps.setGameOver} wordArray={gameProps.wordArray} />


    </div>
  );
}

export default App;
