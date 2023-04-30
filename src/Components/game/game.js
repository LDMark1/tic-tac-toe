import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './game.css';
import tingFile from './../../assets/ting.mp3';
import logo from './../../assets/excited.gif';

const winningCombinations = [
  [0, 1, 2, 5, 5, 0],
  [3, 4, 5, 5, 15, 0],
  [6, 7, 8, 5, 25, 0],
  [0, 3, 6, -5, 15, 90],
  [1, 4, 7, 5, 15, 90],
  [2, 5, 8, 15, 15, 90],
  [0, 4, 8, 5, 15, 45],
  [2, 4, 6, 5, 15, 135],
];

const audioTurn = new Audio(tingFile);

function TicTacToe() {
  const [gameBoard, setgameBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  const lineRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    checkWin();
  }, [gameBoard]);


  const handleBoxClick = (index) => {
    if (!gameOver && gameBoard[index] === '') {
      const newgameBoard = [...gameBoard];
      newgameBoard[index] = turn;
      setgameBoard(newgameBoard);
      setTurn(turn === 'X' ? 'O' : 'X');
      audioTurn.play();
    }
  };

  const handleResetClick = () => {
    setgameBoard(Array(9).fill(''));
    setTurn('X');
    setGameOver(false);
    setGameStatus('');
    lineRef.current.style.width = '0vw';
    imgRef.current.style.width = '0px';
  };

  const checkWin = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c, x, y, deg] = winningCombinations[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
        setGameOver(true);
        setGameStatus(`${gameBoard[a]} wins!`);
        const line = lineRef.current;
        imgRef.current.style.width = '200px';
        line.style.transform = `translate(${x}vw, ${y}vw) rotate(${deg}deg)`;
        line.style.width = '20vw';
        return;
      }
    }
    if (!gameBoard.includes('')) {
      setGameOver(true);
      setGameStatus('Draw!');
    }
  };

  const renderBox = (index) => (
    <div
      key={index}
      className={classNames('box', getBorderClass(index))}
      onClick={() => handleBoxClick(index)}
    >
      <span className="boxtext">{gameBoard[index]}</span>
    </div>
  );

  const getBorderClass = (index) => {
    return classNames({
      'bt': index < 3,
      'bl': index % 3 === 0,
      'br': index % 3 === 2,
      'bb': index > 5
    });
  };

  return (
    <div className="gameContainer">
      <div className="container">
      <div className="line" ref={lineRef}></div>
        {gameBoard.map((box, index) => renderBox(index))}
      </div>
      <div className="info">
        {gameOver ? gameStatus : `Turn for ${turn}`}
      </div>
      <div className="imgbox">
        <img ref={imgRef} src={logo}/>
      </div>
      <button className="reset" onClick={handleResetClick}>
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe;
