import axios from '@services/utils/axios';
import useLocalStorage from '@hooks/useLocalStorage';

const LocalToken = () => {
  const accessToken = useLocalStorage('access-token', 'get');

  const config = {
    headers: {
      Authorization: `Bearer  ${accessToken}`,
    },
  };
  return config;
};

class ChatRoomService {
  // good
  // @ DESC    GET all the chatRooms
  // @ METHOD  GET
  // @ ROUTE   /api/v1/chatroom
  async getAllChatRooms() {
    const response = axios.get('/chatroom', LocalToken());
    return response;
  }

  // good
  // @ DESC    Create a room with the id generated
  // @ METHOD  POST
  // @ ROUTE   /api/v1/chatroom/roomId
  async createChatRoom(body) {
    const response = axios.post('/chatroom/roomId', body, LocalToken());
    return response;
  }

  // good
  // @ DESC    Save caribous that want to antler exchange
  // @ METHOD  POST
  // @ ROUTE   /api/v1/chatroom/message
  async saveChatRoomMsgs(data) {
    const response = axios.post(`/chatroom/message`, data, LocalToken());
    return response;
  }

  //
  // @ DESC    Get all Messages
  // @ METHOD  Get
  // @ ROUTE   /api/v1/chatroom/:messageId
  async getAllMessages(data) {
    const { messageId } = data;
    const response = axios.post(`/chatroom/${messageId}`, data, LocalToken());
    return response;
  }
}

export const chatRoomService = new ChatRoomService();
