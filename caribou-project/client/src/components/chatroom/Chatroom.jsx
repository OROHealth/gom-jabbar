import { useEffect, useState } from 'react';

// web Sockets
import socket from '@services/websocket/webSocketIO';

// local storage
import useLocalStorage from '@hooks/useLocalStorage';

// StyleSheet
import '@components/chatroom/Chatroom.styles.scss';

const initialState = {
  sender: '',
};

const Chatroom = ({ openChat, setOpenChat, refClickOutside }) => {
  const [formField, setFormField] = useState(initialState);
  const [receivedResponse, setReceivedResponse] = useState('');
  const [receivedResponseUsername, setReceivedResponseUsername] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const getStorageEmail = useLocalStorage('app-email', 'get');
  const username = getStorageEmail.slice(0, 4);

  // user connected or disconnected
  const [userConnected, setUserConnected] = useState(null);
  const [userDisconnected, setUserDisconnected] = useState(null);

  // received th username and saves it in state
  const [receivedUsername, setReceivedUsername] = useState(false);

  const { sender } = formField;

  const clearFields = () => {
    setFormField(initialState);
  };

  // handle Input change
  const inputMessageOnChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  // Listening for The Message Response from websocket when we receive a message
  useEffect(() => {
    socket.on('chat_message_received_broadcast', (data) => {
      setReceivedResponse(data.message);
      setReceivedResponseUsername(data.username);
      setReceivedUsername(true);
    });

    socket.on('user-connected', (data) => {
      console.log(data);
      setUserConnected(data);
    });

    socket.on('user-disconnected', (data) => {
      setUserDisconnected(data);
      console.log(data);
    });
  }, []);

  // Sending - Submission of the form
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    setSentMessage(sender);

    // Emitting/Sending a message to the backend
    await socket.emit('send_chat_message', { message: sender, username });
    await socket.emit('new-user', { username });
    clearFields();
  };

  return (
    <div ref={refClickOutside} className="chat-container">
      <div className="chat-content">
        <div className="chat-context-messages">
          <span>{userConnected}</span>
          <span>{userDisconnected}</span>
          <span>
            {receivedUsername && receivedResponseUsername} {receivedResponse}
          </span>
          <span>{sentMessage && `${username} ${sentMessage}`}</span>
        </div>
        <div className="chat-form">
          <form onSubmit={handleMessageSubmit}>
            <input type="text" name="sender" id="sender" value={sender} onChange={inputMessageOnChangeHandler} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
