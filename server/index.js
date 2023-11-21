import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

server.listen(9876, () => {
  console.log('server running at http://localhost:9876');
});
