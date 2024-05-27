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
    // 4.7.4.	The system checks the name in the display name field to determine if it is null or not
    if (displayName !== '') {
      // 4.7.5.	The system connects to the Socket Server
      const socket = new SockJS('http://localhost:8080/ws');

     
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        setStompClient(stompClient);
        // 4.7.6.	The system redirects the user to the chat room. 
        navigate('/chatroom');
        console.log('Connected to STOMP server');
      });

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>JoinRoom</>`}</h1>
        {/* 4.7.2.	The user fill in their name in the display name field. */}
        <input
          className={styles.input}
          placeholder='Displayname...'
          onChange={(e) => setDisplayName(e.target.value)} // Add this
        />
        {/* 4.7.3.	The user clicks the join button */}
        <button className='btn btn-secondary' onClick={joinRoom}>
          Join Chat Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;