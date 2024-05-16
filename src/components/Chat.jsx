import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Chat.css';

const Chat = () => {
    const { isLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);

    const sessions = [
        { id: 1, name: "John Doe", lastMessage: "What's up?", timestamp: "10:30 AM" },
        { id: 2, name: "Jane Smith", lastMessage: "See you later!", timestamp: "Yesterday" },
    ];

    if (!isLoggedIn) return null;

    useEffect(() => {
        function handleClickOutside(event) {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [chatRef]);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div ref={chatRef} className={`chat-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button onClick={toggleChat} className="chat-toggle-btn"><FaComments /></button>
            )}
            {isOpen && (
                <div className="chat-box">
                    <div className="chat-header">
                        Chat
                        <button onClick={() => setIsOpen(false)} className="chat-close-btn"><FaTimes /></button>
                    </div>
                    <div className="chat-body">
                        {sessions.map(session => (
                            <div key={session.id} className="chat-session" onClick={() => alert(`Open chat with ${session.name}`)}>
                                <strong>{session.name}</strong>: {session.lastMessage}
                                <span className="timestamp">{session.timestamp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
