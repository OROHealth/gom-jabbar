import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {initSocket, joinRoom, listenMessage, sendMessage} from '../../actions/chat';

import './styles.css';
import ChatIcon from '../../assets/images/chat.svg';
import Button from "../ui/Button";

const room = 'myRoom';
let socket;

const computePicUrl = (sender) => `https://robohash.org/${sender}?set=set4&bgset=&size=50x50`;

const Message = ({sender, content, self, bot}) => {
  if (bot) {
    return (
      <div className="message bot">
        {content}
      </div>
    );
  }
  return (
    <div className={`message ${self ? 'self' : ''}`}>
      {!self &&
      <div className="picto">
        <img alt={"userPict"} src={computePicUrl(sender)}/>
      </div>
      }
      <span className="content">
        {content}
      </span>
      {self &&
      <div className="picto">
        <img alt={"userPict"} src={computePicUrl(sender)}/>
      </div>
      }
    </div>
  )
};

const MessageInput = ({submitNewMessage}) => {
  const [newMessage, setNewMessage] = useState('');
  return (
    <div className="messageInput">
      <input
        type="text" placeholder="Entrez votre message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(event) => {
          if(event.key === 'Enter'){
            setNewMessage('');
            submitNewMessage(newMessage);
          }
        }}
      />
    </div>
  )
};

const Chat = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const userEmail = useSelector(s => s.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = initSocket();
    if (userEmail) {
      dispatch(joinRoom(socket, room));
      dispatch(listenMessage(socket, message => setMessages(msgs => [...msgs, message])));
    }
    return () => {
      socket.close();
    }
  }, [userEmail]);

  const submitNewMessage = (message) => {
    if (socket) {
      dispatch(sendMessage(socket, message, room));
    }
  };

  if (isCollapsed) {
    return (
      <div className="chat collapsed" onClick={() => setCollapsed((status => !status))}>
        <img alt="chat" src={ChatIcon} className="chatIcon"/>
      </div>
    )
  }
  return (
    <div className="chat">
      <Button className="close" onClick={() => setCollapsed(status => !status)}>Fermer</Button>
      <h2>Messagerie en direct !</h2>
      {messages.length === 0 &&
        <p>Aucun message ? Lancez la discussion !</p>
      }
      {
        messages.map((message) => {
          return (
            <Message
              key={Math.random()}
              content={message.text}
              sender={message.user}
              bot={message.user === "admin"}
              self={message.user === userEmail}
            />
          );
        })
      }
      <MessageInput submitNewMessage={submitNewMessage}/>
    </div>
  );
};

export default Chat;
