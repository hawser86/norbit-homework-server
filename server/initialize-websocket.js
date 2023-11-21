import { Server } from 'socket.io';
import { io } from 'socket.io-client';

export const initializeWebsocket = (httpServer) => {
  const serverSocket = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  serverSocket.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('update-recording-status', isRecordingRunning => {
      socket.broadcast.emit('update-recording-status', isRecordingRunning);
    });
  });

  const boatPositionStreamerClientSocket = io("http://localhost:6789");
  boatPositionStreamerClientSocket.on('boat-position', position => {
    serverSocket.emit('boat-position', {
      latitude: position.lat,
      longitude: position.lon,
      heading: position.heading
    })
  });
};
