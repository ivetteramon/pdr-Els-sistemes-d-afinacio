export const A4 = 440;
export const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function getNoteInfo(freq) {
  const semitones = 12 * Math.log2(freq / A4);
  const roundedSemitone = Math.round(semitones);
  const noteIndex = (roundedSemitone + 69) % 12;
  const noteName = noteNames[noteIndex];
  const midiNote = roundedSemitone + 69;
  const octave = Math.floor(midiNote / 12) - 1;
  const noteFreq = A4 * Math.pow(2, (midiNote - 69) / 12);
  return { name: `${noteName}${octave}`, freq: noteFreq };
}
