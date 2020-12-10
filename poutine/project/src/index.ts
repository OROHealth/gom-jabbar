import 'source-map-support/register';
import 'colors';
import http, { Server } from 'http';
import app from './app';

const { NODE_ENV, PORT, IP } = process.env;

console.log(`Starting ${NODE_ENV} server...`.cyan);

const server = http.createServer(app);

server.listen(PORT, IP as any, (): void => {
    if (server.address()) {
        console.log(`✔ Server listening at ${getServerAddress(server)}`.green);
    } else {
        console.log(`💀 No server address. The port ${PORT} was most likely already in use`.red);
    }
});

server.on('error', (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = getServerAddress(server);

    switch (error.code) {
        case 'EACCES':
            console.log(`${address} requires elevated privileges`.red);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${address} is already in use`.red);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

function getServerAddress(srv: Server): string {
    const address = srv.address();
    if (!address) {
        return 'Unknown adress';
    }

    return typeof address === 'string' ? address : `${address.address}:${address.port}`;
}
