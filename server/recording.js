let _isRecordingRunning = false;

export const isRecordingRunning = () => _isRecordingRunning;

export const startRecording = async () => {
  _isRecordingRunning = true;
};

export const stopRecording = () => {
  _isRecordingRunning = false;
};
