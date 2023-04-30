import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from './../../assets/logo.png';

function Home() {
  return (
    <div className="homeContainer">
      <div className="header">
        <img className="logo" src={logo} alt="Tic Tac Toe" />
        <h1 className="title">Tic Tac Toe</h1>
      </div>
      <div className="content">
        <p className="description">
          Tic Tac Toe is a classic game that's easy to learn but hard to master.
          The game is played on a 3x3 grid where players take turns marking their symbol
          (either X or O) in an attempt to get three in a row. The first player to get
          three in a row wins the game.
        </p>
        <p className="description">
          Our version of the game features stunning graphics, sound effects, and animations.
          You can play with your loved ones. So, gather your friends and family,
          and get ready to experience the fun and excitement of Tic Tac Toe.
        </p>
        <Link to="/tictactoe" className="button-53">
        Play Now
        </Link>

      </div>
    </div>
  );
}

export default Home;
