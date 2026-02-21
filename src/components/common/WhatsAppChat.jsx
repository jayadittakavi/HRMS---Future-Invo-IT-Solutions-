import React from 'react';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
    const phoneNumber = "919000000000"; // Replace with actual number
    const message = "Hello! I have a query regarding Future Invo HRMS.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="whatsapp-chatbot-container" onClick={handleClick}>
            <div className="whatsapp-icon-wrapper">
                <i className="fab fa-whatsapp"></i>
                <span className="tooltip-text">Chat with us!</span>
            </div>
        </div>
    );
};

export default WhatsAppChat;
