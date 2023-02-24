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
  // @ DESC    Save caribous that want to antler exchange
  // @ METHOD  POST
  // @ ROUTE   /api/v1/chatroom/:roomId
  async saveChatRoom(roomId) {
    const response = axios.post('/chatroom/:roomId', roomId, LocalToken());
    return response;
  }

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
}

export const chatRoomService = new ChatRoomService();
