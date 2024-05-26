import React from 'react';
import backgroundImage from '../img/1000_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg';
import '../css/style.css';

const Game = ({ onNewGame }) => {
    const gameContainerStyle = {
        backgroundImage: `url(${backgroundImage})`,
    };

    return (
        <div className="game-container" style={gameContainerStyle}>
            <h1 className="game-title">GUESS WORD</h1>
            {/* 6a.	Người chơi nhấn vào nút "New game" trên màn hình chính.*/}
            <button className="new-game-button" onClick={onNewGame}>New game</button>
        </div>
    );
};

export default Game;