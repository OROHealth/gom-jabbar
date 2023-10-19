import axios from '@services/utils/axios';

class UserService {
  async getUser() {
    const response = axios.get('/getUser');
    return response;
  }
}
export const userService = new UserService();
