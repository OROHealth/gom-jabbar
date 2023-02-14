import axios from '@utils/axios';

class UserService {
  async getUserSuggestions() {
    const response = axios.get('/user/profile/user/suggestions');
    return response;
  }
}
export const userService = new UserService();
