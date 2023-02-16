import axios from '@services/utils/axios';

class UserService {
  async getUserSuggestions() {
    const response = axios.get('/user/profile/user');
    return response;
  }
}
export const userService = new UserService();
