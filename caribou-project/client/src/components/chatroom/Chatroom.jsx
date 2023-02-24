import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// web Sockets
import socket from '@services/websocket/webSocketIO';

// local storage
import useLocalStorage from '@hooks/useLocalStorage';

// StyleSheet
import '@components/chatroom/Chatroom.styles.scss';
import { FaTimesCircle } from 'react-icons/fa';

// API
import { chatRoomService } from '@services/api/chatroom/chatroom.service';
import { antlerExchangeService } from '@services/api/antlerExchangeRoom/antlerExchangeRoom.service';

const initialState = {
  sender: '',
};

const Chatroom = ({ customRoomNumber, setOpenChat }) => {
  const [formField, setFormField] = useState(initialState);
  const [receivedResponse, setReceivedResponse] = useState('');
  const [receivedResponseUsername, setReceivedResponseUsername] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const getStorageEmail = useLocalStorage('app-email', 'get');
  const username = getStorageEmail.slice(0, 4);
  const navigate = useNavigate();
  const [didNotFindRoomInServer, setDidNotFindRoomInServer] = useState(false);

  // user connected or disconnected
  const [userConnected, setUserConnected] = useState(null);
  const [userDisconnected, setUserDisconnected] = useState(null);

  // received th username and saves it in state
  const [receivedUsername, setReceivedUsername] = useState(false);

  const { sender } = formField;

  const clearFields = () => {
    setFormField(initialState);
  };

  // Fetching the chatroom id from the params
  const { chatroom } = useParams();

  useEffect(() => {
    let isCancelled = true;
    // Functions to redirect a user if they enter into a wrongs Chatroom Url
    const gettingRoom = async () => {
      // Getting all the rooms from the server
      await chatRoomService.getAllChatRooms().then((allRooms) => {
        // console.log('found in server');
        if (isCancelled) {
          // console.log('All Rooms from the Server', allRooms.data);
          if (allRooms.data[chatroom] == null) {
            setDidNotFindRoomInServer(true);
          }
        }
      });

      // If the room wasn't found in the server, look in the database
      if (didNotFindRoomInServer) {
        await antlerExchangeService.getAntlerExchangeCaribous().then((allMeetingsInDB) => {
          if (isCancelled) {
            // Find will return the items that match the criteria
            const result = allMeetingsInDB.data.allAntlerExchangeCaribous.find((items) => {
              return items.customRoomNumber === chatroom;
            });
            // If the room was not in the server or in the database - redirect the user back to the meeting page
            if (!result) {
              navigate('/app/secret-meeting-room');
            }
          }
        });
      }
    };
    gettingRoom();

    return () => {
      isCancelled = false;
    };
  }, [chatroom, navigate, didNotFindRoomInServer]);

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

  const handleCloseMessage = () => {
    setOpenChat(false);
  };

  return (
    <div className="chat-container">
      <button onClick={handleCloseMessage}>
        <FaTimesCircle />
      </button>
      <p>{customRoomNumber}</p>
      <div className="chat-content">
        <div className="chat-context-messages">
          <span>{userConnected}</span>
          <span>{userDisconnected}</span>
          <p>
            {receivedUsername && receivedResponseUsername} {receivedResponse}
          </p>
          <p>{sentMessage && `${username} ${sentMessage}`}</p>
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
