import React from 'react';
import sampleImage from '../img/1000_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg';
import '../css/style.css';

const GameControl = ({ onPause, onReset, onMainMenu, isPaused }) => {
    return (
        <div className="game-control">
            <h2>Nhìn Hình Đoán Chữ</h2>
            <div className="image-container">
                <img src={sampleImage} alt="Sample" className="game-image" />
            </div>
            <input type="text" className="answer-input" placeholder="Nhập câu trả lời của bạn" />
            <button className="submit-button">Kiểm tra</button>
            <div className="control-buttons">
                <button onClick={onPause}>{isPaused ? 'Continue' : 'Pause'}</button>
                <button onClick={onReset}>Reset</button>
                <button onClick={onMainMenu}>Main Menu</button>
            </div>
        </div>
    );
};

export default GameControl;
