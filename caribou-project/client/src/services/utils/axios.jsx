import axios from 'axios';

// when developing locally, change this value to develop
export const BASE_ENDPOINT = 'http://localhost:3001';

// Route http://localhost:3001/api/v1
const BASE_URL = `${BASE_ENDPOINT}/api/v1`;
// console.log('BASE_URL', BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
});
