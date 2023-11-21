import { loadPositionsForTrack, recordTrack } from './db.js';

let _isRecordingRunning = false;
let _currentTrackId = null;

export const isRecordingRunning = () => _isRecordingRunning;
export const getCurrentTrackId = () => _currentTrackId;

export const startRecording = async () => {
  const trackName = new Date().toISOString();
  _currentTrackId = await recordTrack(trackName);
  _isRecordingRunning = true;
};

export const stopRecording = () => {
  _isRecordingRunning = false;
};

export const loadPositionsForCurrentTrack = async () => {
  return await loadPositionsForTrack(_currentTrackId);
};
