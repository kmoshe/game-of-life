import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import GameOfLife from './features/gameOfLife/containers/gameOfLife/gameOfLife';

function App() {
  return (
    <div className="App">
      <GameOfLife />
    </div>
  );
}

export default App;
