import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import {
  getCurrentTrackId,
  isRecordingRunning,
  loadPositionsForCurrentTrack,
  startRecording,
  stopRecording
} from './recording.js';
import { loadTrackList, recordPosition } from "./db.js";

export const initializeWebsocket = (httpServer) => {
  const serverSocket = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  serverSocket.on('connection', async clientSocket => {
    console.log('a user connected');

    clientSocket.on('disconnect', () => {
      console.log('user disconnected');
    });

    clientSocket.on('update-recording-status', async isRecordingRunning => {
      if (isRecordingRunning) {
        await startRecording();
      } else {
        stopRecording();
        serverSocket.emit('track-list', await loadTrackList());
      }

      clientSocket.broadcast.emit('update-recording-status', isRecordingRunning);
    });

    clientSocket.emit('update-recording-status', isRecordingRunning());
    if (isRecordingRunning()) {
      const positions = await loadPositionsForCurrentTrack();
      positions.forEach(position => serverSocket.emit('boat-position', { position, shouldRecord: true }));
    }

    clientSocket.emit('track-list', await loadTrackList());
  });

  startListeningForBoatPositionUpdates(async position => {
    const isRunning = isRecordingRunning();
    if (isRunning) {
      await recordPosition(getCurrentTrackId(), position);
    }

    serverSocket.emit('boat-position', { position, shouldRecord: isRunning });
  });
};

const startListeningForBoatPositionUpdates = (handleNewPosition) => {
  const boatPositionStreamerClientSocket = io("http://localhost:6789");
  boatPositionStreamerClientSocket.on('boat-position', async positionRaw => {
    await handleNewPosition({
      latitude: positionRaw.lat,
      longitude: positionRaw.lon,
      heading: positionRaw.heading
    });
  });
};
