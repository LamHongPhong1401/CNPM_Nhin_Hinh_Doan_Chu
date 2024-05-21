import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Add this


const JoinRoom = ({ displayName, setDisplayName ,setStompClient }) => {
  const navigate = useNavigate()
  // const history = useHistory();
  const joinRoom = () => {
    // 4.7.4 check name
    if (displayName !== '') {
      // 4.7.5 Connect to Socket
      const socket = new SockJS('http://localhost:8080/ws');

      // Tạo một STOMP client từ SockJS instance
      const stompClient = Stomp.over(socket);
      // Kết nối STOMP client tới máy chủ STOMP
      stompClient.connect({}, () => {
        // 4.7.6 set socket for using in ChatRoom
        setStompClient(stompClient);
        navigate('/chatroom');
        console.log('Connected to STOMP server');
      });

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>JoinRoom</>`}</h1>
        {/* 4.7.2 Enter User Name */}
        <input
          className={styles.input}
          placeholder='Displayname...'
          onChange={(e) => setDisplayName(e.target.value)} // Add this
        />
        {/* 4.7.3 Click Join Button */}
        <button className='btn btn-secondary' onClick={joinRoom}>
          Join Chat Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;