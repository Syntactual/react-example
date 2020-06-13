import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const renderSquare = (props) => {
  return (
    <Square
      value={props.squares[props.i]}
      onClick={() => {
        props.onClick(props.i);
      }}
    />
  );
};

const Board = (props) => {
  return (
    <div>
      <div className="board-row">
        {renderSquare({ i: 0, ...props })}
        {renderSquare({ i: 1, ...props })}
        {renderSquare({ i: 2, ...props })}
      </div>
      <div className="board-row">
        {renderSquare({ i: 3, ...props })}
        {renderSquare({ i: 4, ...props })}
        {renderSquare({ i: 5, ...props })}
      </div>
      <div className="board-row">
        {renderSquare({ i: 6, ...props })}
        {renderSquare({ i: 7, ...props })}
        {renderSquare({ i: 8, ...props })}
      </div>
    </div>
  );
};

const Game = (props) => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setIsNext] = useState(true);

  const handleClick = (i) => {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = getWhoIsNext();
    setHistory(hist.concat([{ squares }]));
    setStepNumber(hist.length);
    setIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsNext(step % 2 === 0);
  };
  const getWhoIsNext = () => {
    return xIsNext ? 'X' : 'O';
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner ${winner}`;
  } else {
    status = `Next player: ${getWhoIsNext()}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

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
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
