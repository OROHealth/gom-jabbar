import axios from '@services/utils/axios';

class UserService {
  async logoutUser() {
    const response = axios.get('/logout');
    return response;
  }
}
export const userService = new UserService();
