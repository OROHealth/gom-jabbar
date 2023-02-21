import io from 'socket.io-client';

//  turn off polling and rely only on webSockets
const socket = io.connect('http://localhost:3001', { transports: ['websocket'] });

export default socket;
