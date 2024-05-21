import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinRoom from "./components/chat/JoinRoom";
import './css/bootstrap.min.css'
import ChatRoom from "./components/chat/ChatRoom";

export default function App() {
    const [displayName, setDisplayName] = useState(''); // Add this
    const [stompClient, setStompClient] = useState(null);
    return (
        <Router>
        <div className='App'>
          <Routes>
            {/* 4.7.1 Access to JoinRoom */}
            <Route path='/joinRoom' element={<JoinRoom displayName={displayName} setDisplayName={setDisplayName}  setStompClient={setStompClient}/>} />
            <Route path='/chatRoom' element={<ChatRoom  displayName={displayName}  stompClient={stompClient} setStompClient={setStompClient}/>} />
          </Routes>
        </div>
      </Router>
    )
}