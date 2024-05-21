import styles from './styles.module.css';
import UserNav from './UserNav'
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
const ChatRoom = ({ stompClient, displayName, setStompClient }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!stompClient) {
            navigate('/joinRoom')
        }
    })
    return (
        <div className={styles.chatContainer}>
            <UserNav setStompClient={setStompClient} stompClient={stompClient}></UserNav>
            <div>
                <Messages stompClient={stompClient}></Messages>
                <SendMessage stompClient={stompClient} displayName={displayName} />
            </div>
        </div>
    );
};

export default ChatRoom;


const Messages = ({ stompClient }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

    const useEffectOnce = (effect) => {
        const [needToCall, setNeedToCall] = React.useState(false);

        React.useEffect(() => {
            if (needToCall) {
                effect();
            }
            else {
                setNeedToCall(true);
            }
        }, [needToCall]);
    };
    // Runs whenever a socket event is recieved from the server
    useEffectOnce(() => {
        const fetchData = async () => {
            try {
                // 4.7.7 
                const response = await fetch('http://localhost:8080/message');
                const data = await response.json();
                for (let i = data.length - 1; i >= 0; i--) {
                    setMessagesReceived((state) => [
                        ...state,
                        {
                            message: data[i].message,
                            displayName: data[i].displayName,
                            __createdtime__: data[i].createAt,
                        },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

       
         // 4.7.7 listen from socket
        stompClient.subscribe('/topic/messages', (data) => {
            var message = JSON.parse(data.body)
            // 4.7.15 update UI
            setMessagesReceived((state) => [
                ...state,
                {
                    message: message.message,
                    displayName: message.displayName,
                    __createdtime__: message.createAt,
                },
            ]);
        });
        // 4.7.8 get100messages
        fetchData();
    }, []);

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        // Add ref to this div
        <div className={styles.messagesColumn} >
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.msgMeta}>{msg.displayName}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};
const SendMessage = ({ stompClient, displayName }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message !== '') {
            const createdtime = Date.now();
            // 4.7.11 send message to SocketServer
            stompClient.send("/app/send-message", {}, JSON.stringify({ displayName: displayName, message: message, createAt: createdtime }));
            // 4.7.13 set Message
            setMessage('');
        }
    };

    return (
        <div className={styles.sendMessageContainer}>
            {/* 4.7.9 compose message */}
            <input
                className={styles.messageInput}
                placeholder='Message...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            {/* 4.7.10 Click send button */}
            <button className='btn btn-primary' onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};

