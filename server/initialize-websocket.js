import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { startRecording, stopRecording, isRecordingRunning } from './recording.js';

export const initializeWebsocket = (httpServer) => {
  const serverSocket = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  serverSocket.on('connection', clientSocket => {
    console.log('a user connected');

    clientSocket.on('disconnect', () => {
      console.log('user disconnected');
    });

    clientSocket.on('update-recording-status', async isRecordingRunning => {
      if (isRecordingRunning) {
        await startRecording();
      } else {
        stopRecording();
      }

      clientSocket.broadcast.emit('update-recording-status', isRecordingRunning);
    });

    clientSocket.emit('update-recording-status', isRecordingRunning());
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
