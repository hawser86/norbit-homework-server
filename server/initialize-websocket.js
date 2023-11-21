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

  sendDummyBoatPositions(socketIo);
};

const sendDummyBoatPositions = (socketIo) => {
  const dummyBoatPositions = [
    { latitude: 48.21339894, longitude: 20.73998593, heading: 3.470315226 },
    { latitude: 48.21340378, longitude: 20.73998763, heading: 3.678493726 },
    { latitude: 48.21341274, longitude: 20.73999099, heading: 3.863217998 }
  ];
  let counter = 0

  setInterval(() => {
    socketIo.emit('boat-position', dummyBoatPositions[counter++ % dummyBoatPositions.length]);
  }, 1000);
}