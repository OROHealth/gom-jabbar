import io from 'socket.io-client';

export const BASE_ENDPOINT = 'http://localhost:8081';
export const PROD_ENDPOINT = 'https://caribou-newproject.fly.dev';

// Route http://localhost:3001/api/v1
// dev
const BASE_URL = `${BASE_ENDPOINT}`;
// prod
// const PROD_SERVER_URL = `${PROD_ENDPOINT}`;

//  turn off polling and rely only on webSockets - Dev
const socket = io.connect(BASE_URL, { transports: ['websocket'] });

// - Production
// const socket = io.connect(PROD_SERVER_URL, { transports: ['websocket'] });

export default socket;
