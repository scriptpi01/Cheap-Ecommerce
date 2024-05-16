import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ChatWindow = ({ session, onClose }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, timestamp: new Date().toISOString() }]);
            setMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <span>{session.name}</span>
                <button onClick={() => onClose(session.id)}><FaTimes /></button>
            </div>
            <ul className="messages">
                {messages.map((msg, index) => (
                    <li key={index}>{msg.text} - {new Date(msg.timestamp).toLocaleTimeString()}</li>
                ))}
            </ul>
            <div className="message-input">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};
