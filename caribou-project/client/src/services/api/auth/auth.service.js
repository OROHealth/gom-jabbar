import axios from '@services/utils/axios';

class AuthService {
  // define all the functions you need
  async signUp(body) {
    const response = axios.post('user/register', body);
    return response;
  }

  async signIn(body) {
    const response = axios.post('user/login', body);
    return response;
  }

  async forgotPassword(email) {
    const response = axios.post('forgot-password', { email });
    return response;
  }

  async resetPassword(token, body) {
    const response = axios.post(`reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();
