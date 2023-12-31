import pg from 'pg';

let client;

export const connectToDb = async () => {
  client = new pg.Client();
  await client.connect();
};

export const recordTrack = async (name) => {
  const { rows } = await client.query('CALL record_track ($1, null)', [name]);
  return rows[0].new_id;
};

export const recordPosition = async (trackId, position) => {
  await client.query(
    'CALL record_position ($1, $2, $3, $4)',
    [trackId, position.latitude, position.longitude, position.heading]
  );
};

export const loadPositionsForTrack = async trackId => {
  const { rows } = await client.query(`
    SELECT latitude, longitude, heading 
    FROM recorded_positions 
    WHERE track_id = $1 
    ORDER BY id
  `, [trackId]);
  return rows;
};

export const loadTrackList = async () => {
  const { rows } = await client.query(`
    SELECT * 
    FROM recorded_tracks 
    ORDER BY name
  `);
  return rows;
};
