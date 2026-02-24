import React, { useState } from 'react';
import './AskMeAI.css';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const AskMeAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your HRMS Assistant. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: inputValue, isBot: false }];
        setMessages(newMessages);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = "I'm currently in demo mode. I can help you navigate through the HRMS, explain payroll features, or assist with leave management. What would you like to know?";
            setMessages(prev => [...prev, {
                text: botResponse,
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <div className={`ask-me-ai-container ${isOpen ? 'open' : ''}`}>
            {/* Chat Trigger Button */}
            {!isOpen && (
                <div className="chat-trigger" onClick={toggleChat}>
                    <div className="ai-icon">
                        <FaRobot />
                    </div>
                    <span>Ask Me</span>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <FaRobot />
                            <span>AI Assistant</span>
                        </div>
                        <button className="close-btn" onClick={toggleChat}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Type your question..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-btn" onClick={handleSend}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AskMeAI;
