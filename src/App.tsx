import React, { useState } from 'react';
import './App.css';
import Game from './Components/Game';

const App: React.FC = () => {

  const [gameIsOver, setGameIsOver] = useState(false)

  function startGame() {
    setGameIsOver(false)

  }

  return (
    <div className="App">
      {gameIsOver && <button onClick={startGame}>Start Game</button>}
      {!gameIsOver && <Game />}

    </div>
  );
}

export default App;
