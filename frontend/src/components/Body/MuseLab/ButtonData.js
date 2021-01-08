import * as Tone from 'tone';

const ButtonData = (num) => {
  const randInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)

  // const kick = new Tone.Player('/sound/kick.wav').toDestination()
  const tophat = new Tone.Player('/sounds/Hats32.wav').toDestination()
  const snare = new Tone.Player('/sounds/snare-dist01.wav').toDestination()
  const synthLoop = new Tone.Player('/sounds/Synthloop.wav').toDestination()

  const rand1 = randInt(0, 7)
  const rand2 = randInt(0, 7)
  const rand3 = randInt(0, 7)
  const rand4 = randInt(0, 7)

  const colorPicker = (num) => {
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
    }
  }

  switch (num) {
    case 0:
    case 1:
    case 2:
    case 3:
      console.log(rand1)
      return {
        id: `Beat_Button_${num}`,
        class: 'Beat_Button_Tophat',
        name: 'Tophat',
        sound: tophat,
        toggle: false,
        color: colorPicker(rand1),
      }
    case 4:
    case 5:
    case 6:
    case 7:
      return {
        id: `Beat_Button_${num}`,
        class: 'Beat_Button_Snare',
        name: 'Snare',
        sound: snare,
        toggle: false,
        color: colorPicker(rand2),
      }
    case 8:
    case 9:
    case 10:
    case 11:
      return {
        id: `Beat_Button_${num}`,
        class: 'Beat_Button_Kick',
        name: 'Snare',
        sound: snare,
        toggle: false,
        color: colorPicker(rand3),
      }
    case 12:
    case 13:
    case 14:
    case 15:
      return {
        id: `Beat_Button_${num}`,
        class: 'Beat_Button_Tophat',
        name: 'Synth',
        sound: synthLoop,
        toggle: false,
        color: colorPicker(rand4),
      }
    default:
      return {
        id: `Beat_Button_${num}`,
        class: 'Beat_Button_no_beat',
        sound: snare,
        toggle: true
      }
  }
}

export default ButtonData
