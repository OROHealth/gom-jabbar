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
  // @ DESC    Create a Location pin in the database
  // @ METHOD  POST
  // @ ROUTE   /api/v1/map/post=location
  async saveLocation(body) {
    const response = axios.post('map/post=location', body, LocalToken());
    return response;
  }

  // @ DESC    Create a Location pin in the database
  // @ METHOD  GET
  // @METHOD   /api/v1/map + /query=Map-Locations
  async getAllLocations() {
    const response = axios.get('map/query=Map-Locations', LocalToken());
    return response;
  }
}

export const mapService = new MapService();
