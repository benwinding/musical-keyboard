import Speaker from 'speaker';

function getFrequency(note: string): number {
  // return the frequency for the given key
  // you can create a dictionary that maps keys to frequencies
  // or use a formula to calculate the frequency based on the key
  // for example:
  const baseFrequency = 440; // A4 note
  const noteFrequencies: {[note: string]: number} = {
    'c': baseFrequency * Math.pow(2, -9/12), // C0
    'c#': baseFrequency * Math.pow(2, -8/12), // C#0/Db0
    'd': baseFrequency * Math.pow(2, -7/12), // D0
    'd#': baseFrequency * Math.pow(2, -6/12), // D#0/Eb0
    'e': baseFrequency * Math.pow(2, -5/12), // E0
    'f': baseFrequency * Math.pow(2, -4/12), // F0
    'f#': baseFrequency * Math.pow(2, -3/12), // F#0/Gb0
    'g': baseFrequency * Math.pow(2, -2/12), // G0
    'g#': baseFrequency * Math.pow(2, -1/12), // G#0/Ab0
    'a': baseFrequency, // A0
    'a#': baseFrequency * Math.pow(2, 1/12), // A#0/Bb0
    'b': baseFrequency * Math.pow(2, 2/12), // B0
    'c1': baseFrequency * Math.pow(2, 3/12), // C1
    // and so on for all the notes you want to handle
  };

  return noteFrequencies[note] || baseFrequency;
}

const durationInSeconds = 0.1;
const amplitude = 10000;
const sampleRate = 44100;
const speaker = new Speaker({
  channels: 1,          // mono
  bitDepth: 16,         // 16-bit samples
  sampleRate: sampleRate, // 44,100 Hz sample rate
});

async function playTone(frequency: number) {
  const numSamples = durationInSeconds * sampleRate;
  const samples = Buffer.alloc(numSamples * 2);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.round(amplitude * Math.sin(2 * Math.PI * frequency * t));
    samples.writeInt16LE(sample, i * 2);
  }

  return new Promise<void>((resolve, reject) => {
    speaker.write((samples), () => {
      setTimeout(() => {
        resolve();
      }, durationInSeconds * 1000);
    });
  })
}

export const playNote = (note: string) => playTone(getFrequency(note));
