import express from 'express';
import { createServer } from 'node:http';
import { initializeWebsocket } from "./initialize-websocket.js";
import { connectToDb } from './db.js';

const app = express();
const server = createServer(app);

await connectToDb();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

initializeWebsocket(server);

server.listen(9876, () => {
  console.log('server running at http://localhost:9876');
});
