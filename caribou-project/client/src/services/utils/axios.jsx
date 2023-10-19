import axios from 'axios';

const environment = process.env.NODE_ENV;

// when developing locally, change this value to develop
export const BASE_ENDPOINT = 'http://localhost:8081';
export const PROD_ENDPOINT = 'https://caribou-newproject.fly.dev';

// Route http://localhost:8081/api/v1
const BASE_URL = `${BASE_ENDPOINT}/api/v1`;
const PROD_URL = `${PROD_ENDPOINT}/api/v1`;

// const Url = process.env.NODE_ENV === 'production' ? PROD_URL : BASE_URL;

const AXIOS_URL = `${environment === 'development' ? BASE_URL : PROD_URL}`;

export default axios.create({
  baseURL: AXIOS_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
});
