import axios from 'axios';

export let BASE_ENDPOINT = '';

// when developing locally, change this value to develop
export const APP_ENVIRONMENT = 'development';

if (APP_ENVIRONMENT === 'development') {
  BASE_ENDPOINT = 'http://localhost:3001';
} else if (APP_ENVIRONMENT === 'production') {
  BASE_ENDPOINT = 'https://api.<your-backend-domain>';
}
// Route http://localhost:5001/api/v1
const BASE_URL = `${BASE_ENDPOINT}/api/v1/`;
console.log('BASE_URL', BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
});
