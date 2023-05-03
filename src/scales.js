const { GlobalKeyboardListener } = require("node-global-key-listener");
const { playNote } = require("./tone");

module.exports = {
  begin(scale) {
    const v = new GlobalKeyboardListener();
    console.log('Press any key to play a tone');
    
    v.addListener(function (e, down) {
      const key = e.name;
      onKeyPress(key, scale);
    });    
  }
};

function onKeyPress(str, scale) {
  const key = str.trim().toLowerCase();
  const note = getNoteFromKey(key, scale);
  console.log(`Key pressed: ${str} => ${note}`);
  playNote(note);
}

function getNoteFromKey(key, scale) {
  const scales = {
    // Common musical scales
    major: ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
    naturalMinor: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    harmonicMinor: ['a', 'b', 'c', 'd', 'e', 'f', 'g#'],
    melodicMinor: ['a', 'b', 'c', 'd', 'e', 'f#', 'g#'],
    pentatonicMajor: ['c', 'd', 'e', 'g', 'a'],
    pentatonicMinor: ['a', 'c', 'd', 'e', 'g'],
    
    // Rock scales
    blues: ['c', 'd#', 'f', 'f#', 'g', 'a#'],
    minorBlues: ['a', 'c', 'd', 'd#', 'e', 'g'],
    pentatonicBlues: ['c', 'd#', 'f', 'g', 'a#'],
    minorPentatonicBlues: ['a', 'c', 'd', 'e', 'g'],
  }

  const scaleSelected = scales[scale] || scales.major;
  const index = getIndexFromKey(key, scaleSelected.length);
  const note = scaleSelected[index];
  return note;
}

function getIndexFromKey(input, max) {
  const asciiValue = input.charCodeAt(0);
  return Math.floor(asciiValue % max);
}

