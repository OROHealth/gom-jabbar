import axios from '@services/utils/axios';

class MapService {
  // define all the functions you need
  // /api/v1/map/post=location
  async saveLocation(body) {
    const response = axios.post('map/post=location', body);
    return response;
  }
}

export const mapService = new MapService();
