import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { loadBoatPositions } from "./load-boat-positions.js";

const app = express();
const server = createServer(app);
const socketIo = new Server(server, {
  cors: {
    origin: "*"
  }
});

server.listen(6789, () => {
  console.log('fake-boat-position-streamer running at http://localhost:6789');
});

const boatPositions = await loadBoatPositions();
let lineIndex = 0;
let positionIndex = 0;
setInterval(() => {
  socketIo.emit('boat-position', boatPositions[lineIndex][positionIndex]);

  positionIndex = (positionIndex + 1) % boatPositions[lineIndex].length;
  if (positionIndex === 0) {
    lineIndex = (lineIndex + 1) % boatPositions.length;
  }
}, 1000);

