import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const Chatroom = () => {
  // Emiting and event
  const sendMessage = () => {
    socket.emit('send_Message', { message: 'hello' });
  };

  // Listening to an event from websocket when we receive a message
  useEffect(() => {
    socket.on('received_message', (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input type="text" />
      <button onClick={sendMessage}>Submit</button>
    </div>
  );
};

export default Chatroom;
