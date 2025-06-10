import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './ChatRoom.css';

// Create socket instance outside component to avoid multiple connections
const socket = io('http://10.11.22.102:6969'); // replace with your backend IP

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentUser = localStorage.getItem('access_token') || 'Anonymous';

  useEffect(() => {
    // Fetch existing messages once on mount
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://10.11.22.102:6969/chatroomquestions');
        setMessages(response.data.map(m => ({ text: m.message || m.text, user: m.userId || m.user })));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages from the server
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, { text: message.message || message.text, user: message.userId || message.user }]);
    });

    // Clean up the listener on unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMsg = { text: inputValue, user: currentUser };

    // Update UI immediately
    setMessages([...messages, newMsg]);
    setInputValue('');

    try {
      // Save to backend (which broadcasts to other clients)
      await axios.post('http://10.11.22.102:6969/savemessages', newMsg);
    } catch (error) {
      alert('Failed to send message');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDownloadChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="chatroom-container">
        <div className="chatroom-header">
          <h1>Chat Room</h1>
        </div>

        <div className="chatroom-messages">
          {messages.map((message, idx) => (
            <React.Fragment key={idx}>
              <div className={`userinfo ${message.user === currentUser ? 'current-user' : 'other-user'}`}>
                {message.user}
              </div>
              <div className={`chatroom-message ${message.user === currentUser ? 'current-user' : 'other-user'}`}>
                <div className='usermessage' style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                  {message.text}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="chatroom-input-container">
          <textarea
            className="chatroom-input"
            rows={3}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button className="chatroom-send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      <center><h4>*keep reloading for latest messages</h4></center>
      </div>
      <button
        className="chatroom-download-button"
        onClick={handleDownloadChat}
        title='Download Chat'
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </>
  );
};

export default ChatRoom;
