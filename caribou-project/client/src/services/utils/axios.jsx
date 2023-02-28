import axios from 'axios';

// when developing locally, change this value to develop
export const BASE_ENDPOINT = 'http://localhost:8081';
export const PROD_ENDPOINT = 'https://caribou-newproject.fly.dev';

// Route http://localhost:3001/api/v1
const BASE_URL = `${BASE_ENDPOINT}/api/v1`;
const PROD_SERVER_URL = `${PROD_ENDPOINT}/api/v1`;
// console.log('BASE_URL', BASE_URL);
const Url = process.env.NODE_ENV === 'production' ? PROD_SERVER_URL : BASE_URL;

export default axios.create({
  baseURL: Url,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
});
