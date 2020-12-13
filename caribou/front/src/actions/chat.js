import io from "socket.io-client";
import config from "../config";

const initSocket = () => {
  return io(config.SOCKET_HOST);
};

const joinRoom = (socket, room) => () => {
  socket.emit('join', {room});
};

const sendMessage = (socket, message, room, secret = true) => () => {
  socket.emit('sendMessage', {content: message, room, secret});
};

const listenMessage = (socket, callback) => () => {
  socket.on('message', callback);
};

export {
  initSocket,
  joinRoom,
  sendMessage,
  listenMessage
};
