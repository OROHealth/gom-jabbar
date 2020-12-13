module.exports = (SocketServer) => {
  SocketServer.registerSocketEvent({
    eventName: "join",
    authenticationMethod: "OAuth",
    handler: (Socket, Data, Callback, Credentials, MessagingLogic) => {
      const {room} = Data;
      return MessagingLogic.joinRoom(Credentials, room, Socket, Callback);
    }
  });

  SocketServer.registerSocketEvent({
    eventName: "sendMessage",
    authenticationMethod: "OAuth",
    handler: (Data, Callback, IO, Credentials, MessagingLogic) => {
      const {content, room, secret} = Data;
      return MessagingLogic.sendMessage(Credentials, content, secret, room, IO, Callback);
    }
  });
};
