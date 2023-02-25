import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// web Sockets
import socket from '@services/websocket/webSocketIO';

// local storage
import useLocalStorage from '@hooks/useLocalStorage';

// StyleSheet
import '@components/chatroom/Chatroom.styles.scss';
import { FaAngleLeft } from 'react-icons/fa';

// API
import { chatRoomService } from '@services/api/chatroom/chatroom.service';
import { antlerExchangeService } from '@services/api/antlerExchangeRoom/antlerExchangeRoom.service';
import AppNavigation from '@components/app-navigation/AppNavigation.component';

const initialState = {
  sender: '',
};

const messagesInitialState = [];

const Chatroom = () => {
  const [formField, setFormField] = useState(initialState);
  const { sender } = formField;
  const getStorageEmail = useLocalStorage('app-email', 'get');
  const username = getStorageEmail.slice(0, 4);
  const navigate = useNavigate();
  const [didNotFindRoomInServer, setDidNotFindRoomInServer] = useState(false);
  const [customRoomNumber, setCustomRoomNumber] = useState(null);

  // all messages
  const [messages, setMessages] = useState(messagesInitialState);

  const clearFields = () => {
    setFormField(initialState);
  };

  // Fetching the chatroom id from the params
  const { chatroom } = useParams();
  // console.log('chatRoom:', chatroom);

  useEffect(() => {
    let isCancelled = true;
    // Functions to redirect a user if they enter into a wrongs Chatroom Url
    const gettingRoom = async () => {
      try {
        // Getting all the rooms from the server
        await chatRoomService.getAllChatRooms().then((allRooms) => {
          // console.log('found in server');
          if (isCancelled) {
            // console.log('All Rooms from the Server', allRooms.data);
            if (allRooms.data[chatroom] == null) {
              setDidNotFindRoomInServer(true);
            }
            setCustomRoomNumber(chatroom);
          }
        });

        // If the room wasn't found in the server, look in the database
        if (didNotFindRoomInServer) {
          await antlerExchangeService.getAntlerExchangeCaribous().then((allMeetingsInDB) => {
            if (isCancelled) {
              // Find will return the items that match the criteria
              const result = allMeetingsInDB.data.allAntlerExchangeCaribous.find((items) => {
                // Emitting/Sending the message that the caribou typed to the backend along with the room number
                socket.emit('new-user', customRoomNumber, { username });
                socket.emit('send_chat_message', customRoomNumber, { message: sender, username });
                return items.customRoomNumber === chatroom;
              });
              // If the room was not in the server or in the database - redirect the user back to the meeting page
              if (!result) {
                return navigate('/app/secret-meeting-room');
              }
              setCustomRoomNumber(chatroom);
            }
          });
          setDidNotFindRoomInServer(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    gettingRoom();

    return () => {
      isCancelled = false;
      setDidNotFindRoomInServer(false);
    };
    // eslint-disable-next-line
  }, [navigate]);

  // Getting all the messages
  useEffect(() => {
    let isCancelled = true;

    try {
      const gettingMessages = async () => {
        if (isCancelled) {
          const newMessage = {
            messageId: chatroom,
          };
          await chatRoomService.getAllMessages(newMessage).then((result) => {
            // console.log('Messages', result.data[0].messages);
            setMessages(result?.data[0]?.messages);
          });
        }
      };
      gettingMessages();
    } catch (error) {
      console.log(`Error fetching Messages ${error}`);
    }

    return () => {
      isCancelled = false;
    };
    // eslint-disable-next-line
  }, []);

  // handle Input change
  const inputMessageOnChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const fetchFreshMessages = () => {
    try {
      const gettingMessages = async () => {
        const newMessage = {
          messageId: chatroom,
        };
        await chatRoomService.getAllMessages(newMessage).then((result) => {
          setMessages(result?.data[0]?.messages);
        });
      };
      gettingMessages();
    } catch (error) {
      console.log(`Error fetching Messages ${error}`);
    }
  };

  // ** With every Socket Request, send the chat room number
  // Listening for The Message Response from websocket when we receive a message
  useEffect(() => {
    socket.on('messages_was_updated', (data) => {
      fetchFreshMessages();
    });
    socket.on('chat_message_received_broadcast', (data) => {});
    // eslint-disable-next-line
  }, []);

  // Sending - Submission of the form
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    // console.log('Sent Message', sender);
    const newMessage = {
      roomId: chatroom,
      user: username,
      message: sender,
    };
    try {
      const saveMessages = async () => {
        await chatRoomService.saveChatRoomMsgs(newMessage).then((result) => {
          // console.log('Saved Message', result);
        });
      };
      saveMessages();
    } catch (error) {
      console.log(error);
    }

    // Emitting/Sending the message that the caribou typed to the backend along with the room number
    socket.emit('new-user', customRoomNumber, { username });
    socket.emit('send_chat_message', customRoomNumber, { message: sender, username });

    clearFields();
  };

  return (
    <>
      <AppNavigation />
      <main className="chat-main-wrapper">
        {/*  */}
        <button className="chatroom-msg-backBtn" onClick={() => navigate('/app/secret-meeting-room')}>
          <FaAngleLeft /> Meetings
        </button>
        <div className="chatroom-container">
          {/* <p>{customRoomNumber}</p> */}
          <div className="msg-container">
            <div className="chat-msg-wrapper">
              <div className="chat-context-messages">
                {messages &&
                  messages.map((msg, id) => {
                    const theUser = msg.split(' ')[0].slice(0, 4);
                    if (theUser === username) {
                      return (
                        <div className="each-msg-text you" key={id}>
                          {/* display only the names of the other user  */}
                          <p>{msg.split(' ').slice(1).join(' ')}</p>
                        </div>
                      );
                    } else {
                      return (
                        <p className="each-msg-text" key={id}>
                          {msg}
                        </p>
                      );
                    }
                  })}
              </div>

              <form className="chat-box" onSubmit={handleMessageSubmit}>
                <textarea
                  className="chat-message-Input"
                  type="text"
                  name="sender"
                  id="sender"
                  value={sender}
                  placeholder="Write something..."
                  onChange={inputMessageOnChangeHandler}
                />
                <button className="chat-message-button" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        {/*  */}
      </main>
    </>
  );
};

export default Chatroom;
