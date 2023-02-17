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
class MapService {
  // define all the functions you need
  // /api/v1/map/post=location
  async saveLocation(body) {
    const response = axios.post('map/post=location', body, LocalToken());
    return response;
  }
}

export const mapService = new MapService();
