import React from 'react';
import './WhatsAppChat.css';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppChat = () => {
    const phoneNumber = "919000000000"; // Replace with actual number
    const defaultMessage = "Hello! I have a query regarding WorkSphrer HRMS.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="whatsapp-chatbot-container">
            <div className="whatsapp-icon-wrapper" onClick={handleClick}>
                <FaWhatsapp className="whatsapp-icon" />
                <span className="tooltip-text">Chat with us!</span>
            </div>
        </div>
    );
};

export default WhatsAppChat;
