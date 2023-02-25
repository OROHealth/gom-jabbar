import React from 'react';
import { useNavigate } from 'react-router-dom';

// styleSheet
import '@components/chatroom-slider/ChatroomSlider.styles.scss';

// React Icons
import { FaRocketchat } from 'react-icons/fa';

const ChatroomSlider = () => {
  const navigate = useNavigate();

  // Navigate to the chat room to see all the caribous who want to antler exchange
  const handleSendAntlerExchange = () => {
    navigate('/app/secret-meeting-room');
  };

  return (
    <>
      <h2 style={{ fontSize: 24, color: '#de106f', fontWeight: 900 }}> Antler Exchange Meeting Room</h2>
      <label htmlFor="human-presence">Checkout all the Caribous who want to antler exchange</label>
      <div>
        <FaRocketchat style={{ fontSize: 60 }} />
      </div>
      <div className="anter-exchange-container">
        <div className="loading-button">
          <button type="submit" className="button" onClick={handleSendAntlerExchange}>
            Secret Meetings
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatroomSlider;
