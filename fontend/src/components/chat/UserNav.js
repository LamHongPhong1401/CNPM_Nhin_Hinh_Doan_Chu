import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css'
const RoomAndUsers = ({ stompClient, setStompClient }) => {
 

  const navigate = useNavigate();

  const leaveRoom = () => {
    setStompClient(null);
    navigate('/joinRoom', { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      
      <button className='btn btn-primary btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;