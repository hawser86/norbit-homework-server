import { Server } from 'socket.io';

export const initializeWebsocket = (server) => {
  const socketIo = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  socketIo.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
