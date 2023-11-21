import pg from 'pg';

let client;

export const connectToDb = async () => {
  client = new pg.Client();
  await client.connect();
};

