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

class AntlerExchangeService {
  // @ DESC    Save caribous that want to antler exchange
  // @ METHOD  POST
  // @ ROUTE   /api/v1/antler-exchange
  async saveAntlerExchangeCaribou(body) {
    const response = axios.post('/antler-exchange', body, LocalToken());
    return response;
  }
}

export const antlerExchangeService = new AntlerExchangeService();
