import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import './game.css';
import tingFile from './../../assets/ting.mp3';
import logo from './../../assets/excited.gif';


const audioTurn = new Audio(tingFile);

function TicTacToe() 
{
  const [gameBoard, setgameBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [turns, setTurns] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [isComputerPlaying, setIsComputerPlaying] = useState(false);
  const [playingAgainst, setPlayingAgainst] = useState('Human');
 
  
  const lineRef = useRef(null);
  const imgRef = useRef(null);


  const winningCombinations = useMemo (() =>
[
  [0, 1, 2, 5, 5, 0],
  [3, 4, 5, 5, 15, 0],
  [6, 7, 8, 5, 25, 0],
  [0, 3, 6, -5, 15, 90],
  [1, 4, 7, 5, 15, 90],
  [2, 5, 8, 15, 15, 90],
  [0, 4, 8, 5, 15, 45],
  [2, 4, 6, 5, 15, 135],
]);


  //Checking if there is a winning combination when gameBoard is updated
  useEffect(() => 
  {
    checkWin();
    //turns is used for Computer, so if its computer turn, make a move
    if(turns === 'O')
    {
      computerMove();
    }
  }, [gameBoard]);



  const handleBoxClick = useCallback((index) => 
  {
    if (!gameOver && gameBoard[index] === '') 
    {
      const newgameBoard = [...gameBoard];
      newgameBoard[index] = isComputerPlaying ? turns : turn;
      setgameBoard(newgameBoard);
      //Turn used for human vs human where as turns used for human vs computer
      setTurn(isComputerPlaying ? turn : turn === 'X' ? 'O' : 'X');
      setTurns(isComputerPlaying ? turns === 'X' ? 'O' : 'X' : turns);
      audioTurn.play();
    }
  }, [gameOver, gameBoard, isComputerPlaying, turn, turns]);


  //Logic for computer making a move
  const computerMove = useCallback(() => {
    if (gameOver) {
      return;
    }
    let availableMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === '') {
        availableMoves.push(i);
      }
    }
    const randomNumber = Math.floor(Math.random() * availableMoves.length);
    const newgameBoard = [...gameBoard];
    newgameBoard[availableMoves[randomNumber]] = turns;
    setgameBoard(newgameBoard);
    setTurns('X');
    audioTurn.play();
  }, [gameOver, gameBoard, turns]);
  
  
  
  //Logic for resetting the board
  const handleResetClick = () => {
    setgameBoard(Array(9).fill(''));
    setTurn('X');
    setTurns('X');
    setGameOver(false);
    setGameStatus('');
    lineRef.current.style.width = '0vw';
    imgRef.current.style.width = '0px';
  };


  //Logic for checking if some pattern matches any winning combination
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

    //If all values on board are filled and there is no win, then declare a Draw
    if (!gameBoard.includes('')) {
      setGameOver(true);
      setGameStatus('Draw!');
    }
  };


  //Logic for rendering boxes
  const renderBox = (index) => 
  (
    <div
      key={index}
      className={classNames('box', getBorderClass(index))}
      onClick={() => handleBoxClick(index)}
    >
      <span className="boxtext">{gameBoard[index]}</span>
    </div>
  );


  //Enables me to perform styling on specific boxes (bt->bottomTop, bl->bottomLeft, br->bottomRight, bb->bottomBelow)
  const getBorderClass = useMemo(() => index => {
    return classNames({
      'bt': index < 3,
      'bl': index % 3 === 0,
      'br': index % 3 === 2,
      'bb': index > 5
    });
  }, []);

  
//To enable user play with computer  
const playWithComputer = () =>
{
  setIsComputerPlaying(true);
  setPlayingAgainst('Computer');
  handleResetClick();
}

//To enable user play with an other human
const playWithHuman = () =>
{
  setIsComputerPlaying(false);
  setPlayingAgainst('Human');
  handleResetClick();
}

  return (
    <>
    <div className='playingAgainst'>Playing With {playingAgainst}</div>

      {isComputerPlaying ?  
          <div className="gameContainer">
            <div className="container">
              <div className="line" ref={lineRef}></div>
              {gameBoard.map((box, index) => renderBox(index))}
            </div>
            
            <div className="info">
              {gameOver ? gameStatus : `Turn for ${turn}`}
            </div>
            
            <div className="imgbox">
              <img ref={imgRef} src={logo} alt='cat gif'/>
            </div>

            <button className="reset" onClick={handleResetClick}> Reset Game </button>
          </div> 
          :  
          <div className="gameContainer">
            
            <div className="container">
              <div className="line" ref={lineRef}></div>
              {gameBoard.map((box, index) => renderBox(index))}
            </div>
        
            <div className="info">
              {gameOver ? gameStatus : `Turn for ${turn}`}
            </div>
            
            <div className="imgbox">
              <img ref={imgRef} src={logo} alt='cat gif'/>
            </div>
        
            <button className="reset" onClick={handleResetClick}> Reset Game </button>     
          </div>
        }
   
        <div  className = 'playWithComputerBtn'>
          <button onClick={playWithHuman} className="reset" >Play with Human </button>
          <button onClick={playWithComputer} className="reset"> Play with Computer</button>
        </div>
    </>
  );
}

export default TicTacToe;