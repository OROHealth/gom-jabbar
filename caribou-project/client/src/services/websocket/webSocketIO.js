import io from 'socket.io-client';

const environment = process.env.NODE_ENV;

export const BASE_ENDPOINT = 'http://localhost:8081';
export const PROD_ENDPOINT = 'https://caribou-newproject.fly.dev';

// Route http://localhost:3001/api/v1
const BASE_URL = `${environment === 'development' ? BASE_ENDPOINT : PROD_ENDPOINT}`;

//  turn off polling and rely only on webSockets - Dev
const socket = io.connect(BASE_URL, { transports: ['websocket'] });

// - Production
// const socket = io.connect(PROD_ENDPOINT, { transports: ['websocket'] });

export default socket;
