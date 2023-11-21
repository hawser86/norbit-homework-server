import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadBoatPositions = async () => {
  const files = await Promise.all([
    loadFile('line1.csv'),
    loadFile('line2.csv'),
    loadFile('line3.csv')
  ]);

  return files.map(parseFile);
};

const loadFile = async fileName => {
  return await readFile(join(__dirname, 'lines', fileName), 'utf-8');
};

const parseFile = file => {
  const [_header, ...lines] = file.split('\n');
  return lines
    .filter(line => line.trim() !== '')
    .map(line => {
      const [lat, lon, heading] = line.split(',');
      return {
        lat: Number(lat),
        lon: Number(lon),
        heading: Number(heading)
      }
    });
};
