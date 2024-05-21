import React, { useState } from 'react';
import Game from './Game';
import GameControl from './GameControl';
import '../css/style.css';

const App = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [key, setKey] = useState(0);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const newGame = () => {
        setShowConfirm(true);
    };

    const confirmNewGame = () => {
        setShowConfirm(false);
        setError(null);
        try {
            setIsPaused(false);
            setIsGameStarted(true);
            setKey(prevKey => prevKey + 1);
        } catch (e) {
            setError('Please try again');
        }
    };

    const cancelNewGame = () => {
        setShowConfirm(false);
    };

    const continueGame = () => {
        setIsPaused(false);
    };

    const resetGame = () => {
        setKey(prevKey => prevKey + 1);
    };

    const mainMenu = () => {
        setIsGameStarted(false);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div>
            {!isGameStarted ? (
                <div>
                    {showConfirm && (
                        <div className="confirm-dialog">
                            <p>Do you want to start a new game?</p>
                            <button onClick={confirmNewGame}>YES</button>
                            <button onClick={cancelNewGame}>NO</button>
                        </div>
                    )}
                    <Game onNewGame={newGame} />
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <GameControl
                    key={key}
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
