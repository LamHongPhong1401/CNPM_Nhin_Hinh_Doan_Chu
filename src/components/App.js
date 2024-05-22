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
  /*  6c
    Hệ thống thực hiện các bước sau:
•	Đóng hộp thoại xác nhận.
•	Đặt trạng thái trò chơi thành chưa tạm dừng.
•	Bắt đầu trò chơi mới.
•	Tạo lại các thành phần giao diện trò chơi.
*/
    const confirmNewGame = () => {
        setShowConfirm(false);
        setError(null);
        try {
            setIsPaused(false);
            setIsGameStarted(true);
            setKey(prevKey => prevKey + 1);
        } catch (e) {
        // 7b Hệ thống hiển thị thông báo lỗi cho người chơi, thông báo rằng không thể bắt đầu trò chơi mới.
            setError('Please try again');
        }
    };
// 7a Hệ thống đóng hộp thoại xác nhận và giữ nguyên trạng thái hiện tại của trò chơi mà không bắt đầu trò chơi mới.
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
                        // 6b.	Hệ thống hiển thị hộp thoại xác nhận hỏi người chơi liệu họ có muốn bắt đầu trò chơi mới không.
                        <div className="confirm-dialog">
                            <p>Do you want to start a new game?</p>
                            {/*6c.	Người chơi nhấn "YES" để xác nhận bắt đầu trò chơi mới.*/}
                            <button onClick={confirmNewGame}>YES</button>
                            {/*7a.	Người chơi hủy bỏ việc bắt đầu trò chơi mới:
                            •	Người chơi chọn "NO" trong hộp thoại xác nhận.*/}
                            <button onClick={cancelNewGame}>NO</button>
                        </div>
                    )}
                    {/* 7b Hệ thống hiển thị thông báo lỗi cho người chơi, thông báo rằng không thể bắt đầu trò chơi mới.*/}
                    <Game onNewGame={newGame} />
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                /* 6c
                Hệ thống hiển thị giao diện trò chơi mới, bao gồm:
                    •	Hình ảnh minh họa cho câu hỏi.
                    •	Ô nhập câu trả lời.
                    •	Các nút điều khiển: "Pause", "Reset", và "Main screen".
                 */
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
