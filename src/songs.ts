import { GlobalKeyboardListener } from "node-global-key-listener";
import { playNote } from "./tone";

export function begin() {
  const v = new GlobalKeyboardListener();
  console.log('Press any key to play a tone');

  v.addListener(function (e, down) {
    const key = e.name;
    key && onKeyPress(key);
  });
}

function onKeyPress(str: string) {
  const note = getNextNote();
  console.log(`Key pressed: ${str} => ${note}`);
  playNote(note);
}

let currentIndex = 0;
function getNextNote() {
  const notes = ['d', 'd', 'e', 'd', 'g', 'f#', 'd', 'd', 'e', 'd', 'a', 'g', 'd', 'd', 'd', 'f#', 'e', 'd', 'c#'];
  if (currentIndex >= notes.length) {
    currentIndex = 0;
  }
  return notes[currentIndex++];
}
