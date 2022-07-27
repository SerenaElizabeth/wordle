import React, { useState } from 'react';
import { convertCompilerOptionsFromJson } from 'typescript';
import './App.css';
import Game from './Components/Game';

export interface IGameProps {
  wordArray:string[],
  
}



const App: React.FC = () => {
  
  const wordList = ["funky", "mouse", "plant", "crime", "night"];

  let gameProps:IGameProps = {
      wordArray: Array.from(wordList[Math.floor(Math.random() * wordList.length)]), //gets random word, creates array from letters
    }
    


  return (
    <div className="App">

      <Game wordArray={gameProps.wordArray} />


    </div>
  );
}

export default App;
