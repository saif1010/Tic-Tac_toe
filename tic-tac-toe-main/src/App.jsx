import React, { useState } from 'react';
import './App.css';

function Square(props) {
  return (
    <button onClick={props.onSquareClick} className='square'>
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  function handleClick(i) {
    if (gameOver || squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setIsNext(!xIsNext);

    if (calculateWinner(nextSquares) || nextSquares.every((square) => square !== null)) {
      setGameOver(true);
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      
    }

    if (squares.every((square) => square !== null)) {
      return 'draw';
    }

    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsNext(true);
    setGameOver(false);
  }

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    if (winner === 'draw') {
      status = "It's a draw!";
    } else {
      status = 'Winner: ' + winner;
    }
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className='app'>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button onClick={resetGame} className='reset'>
        Reset Game
      </button>
    </div>
  );
}

function App() {
  return (
    <div className='app'>
      <Board />
    </div>
  );
}

export default App;
