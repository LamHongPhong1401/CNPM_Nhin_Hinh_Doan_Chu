import styles from './styles.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState , useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this



const ChatRoom = ({ stompClient, displayName, setStompClient }) => {
    const divRef = useRef(null);
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
                <Messages stompClient={stompClient} divRef={divRef}></Messages>
                <SendMessage stompClient={stompClient} displayName={displayName} divRef={divRef}/>
            </div>
        </div>
    );
};

export default ChatRoom;


const Messages = ({ stompClient , divRef }) => {
    
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

       
         // 4.7.7.	The system listens for the endpoint "/topic/messages" from SocketServer.
        stompClient.subscribe('/topic/messages', (data) => {
            var message = JSON.parse(data.body)
            // 4.7.15.	The system update UI for all users in the chat room
            setMessagesReceived((state) => [
                ...state,
                {
                    message: message.message,
                    displayName: message.displayName,
                    __createdtime__: message.createAt,
                },
            ]);
        });
        // 4.7.8.	The system loads 100 messages for display
        fetchData();
    }, []);

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
    useEffect(() => {
        // Cuộn xuống dưới của div khi divRef thay đổi (khi dữ liệu mới được tải vào)
        if (divRef.current) {
          divRef.current.scrollTop = divRef.current.scrollHeight;
        }
      }, [messagesRecieved]);
    return (
        // Add ref to this div
        <div ref={divRef} className={styles.messagesColumn} >
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
const SendMessage = ({ stompClient, displayName ,divRef }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message !== '') {
            const createdtime = Date.now();
            // 4.7.11.	The system send message for the enpoint ("/app/send-message") for SocketServer
            stompClient.send("/app/send-message", {}, JSON.stringify({ displayName: displayName, message: message, createAt: createdtime }));
            // 4.7.13.	The system set the message input to be empty.
            if (divRef.current) {
                divRef.current.scrollTop = divRef.current.scrollHeight;
              }
            setMessage('');
        }
    };

    return (
        <div className={styles.sendMessageContainer}>
            {/* 4.7.9.	The user compose message */}
            <input
                className={styles.messageInput}
                placeholder='Message...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            {/* 4.7.10.	The user clicks the "Send Message" button. */}
            <button className='btn btn-primary' onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};
const UserNav =  ({ stompClient, setStompClient }) => {
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