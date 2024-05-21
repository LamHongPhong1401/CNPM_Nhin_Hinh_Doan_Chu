import React, { useState } from 'react';
import Game from './Game';
import GameControl from './GameControl';
import '../css/style.css';

const App = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [key, setKey] = useState(0); // Thêm trạng thái key để quản lý việc reset

    const newGame = () => {
        console.log('New game started');
        setIsPaused(false);
        setIsGameStarted(true);
        setKey(prevKey => prevKey + 1); // Reset key khi bắt đầu trò chơi mới
    };

    const continueGame = () => {
        console.log('Game continued');
        setIsPaused(false);
    };

    const resetGame = () => {
        console.log('Game reset');
        setKey(prevKey => prevKey + 1); // Reset key để load lại GameControl
    };

    const mainMenu = () => {
        console.log('Returning to main menu');
        setIsGameStarted(false);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div>
            {!isGameStarted ? (
                <Game onNewGame={newGame} />
            ) : (
                <GameControl
                    key={key} // Sử dụng key để reset thành phần
                    onPause={togglePause}
                    onReset={resetGame}
                    onMainMenu={mainMenu}
                    isPaused={isPaused}
                />
            )}
        </div>
    );
};

export default App;
