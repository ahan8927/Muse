import * as Tone from 'tone';
import soundLibrary from './SoundLibrary';

export const gain = new Tone.Gain(0.6).toDestination();

export const colorPicker = (num) => {
  switch (num) {
    case 0:
      return '#ffadad'
    case 1:
      return '#ffd6a5'
    case 2:
      return '#fdffb6'
    case 3:
      return '#caffbf'
    case 4:
      return '#9bf6ff'
    case 5:
      return '#a0c4ff'
    case 6:
      return '#bdb2ff'
    case 7:
      return '#ffc6ff'
    default:
      return;
  }
}

export function createSoundArr(library) {
  const soundArr = []
  for (let i = 0; i < soundLibrary[`${library}`].length; i++) {
    soundArr.push(new Tone.Player(soundLibrary[`${library}`][i].file))
  }
  return soundArr
}
