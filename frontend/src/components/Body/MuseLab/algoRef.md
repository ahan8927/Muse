# Algo Reference

```js
let step = 0;
let bpm = 60;


const trackChecker = (track, library) => {
   for(let i = 0; i < track.beat.length){
     if ((track.beat[i] === true) && (not muted)){
       soundLibrary[library].file.play()
     }
   }
}

const interval = setInterval(cb, (60000 / bpm)) 

const padChecker = (pad) => {
  for(let i = 0; i < pad.beats.length){
    const currentTrack = pad.beats[i];
    trackChecker(currentTrack, pad.library)
  }
}

const boardChecker = () = {
  //check all buttons
  for(let i = 0; i < 16; i++){
    const currentPad = sequenceState[i];
    padChecker(currentPad);
  }
}

const startSequencer = () => {
  const sequenceInterval = setInterval(boardChecker(), (60000 / bpm))
}

```
























## Second attempt at refactor

```js

const Board = () => {
  const [bpm, setBpm] = useState(60);
  const master = Tone.toDestination();

  return (
    {sequenceState.map((track, index) => (
      <Button key={index} bpm={bpm} master={master} buttonTrack={sequenceState[index]}/>
    ))}
  )
}

const initializeBlockSequence = (track) => {
  const blockSequence = []
  for(let i = 0; i < track.length; i++){
    blockSequence.push([])
    for(let j = 0l j < track[i].length; j++){
      blockSequence[i].push(buffer[library][track[i].name])
    }
  }
  return blockSequence;
}

//Button Component
const Button = ({bpm, buttonTrack}) => {
  const currentTrack = buttonTrack.track;

  const [play, setPlay] = useRef(false);
  let delay;

  function playTrack(track) {
    console.log('Start!!, track length: ', track.length, '\n')
    let currentBlock = 0;

    (function playBlock() {
      // console.log('currentBlock: ', currentBlock)
      // play note

      let currentNote = 0
      const noteSpeed = ((bpm * multiplier) / track[currentBlock].length)
      if (currentBlock <= track.length - 1) {
        playNote()
      } else {
        console.log('loop done');
        return;
      }

      function playNote() {
        // console.log('currentBlock: ', currentBlock, ' currentNote: ', currentNote, ' currentSpeed: ', noteSpeed)
        // play note

        currentNote++
        if (currentNote < track[currentBlock].length) {
          setTimeout(playNote, noteSpeed);
        } else {
          currentBlock++
          if (currentBlock < track.length) {
            setTimeout(playBlock, noteSpeed);
          } else {
            setTimeout(() => playTrack(track), noteSpeed);
          }
        }
      }
    })()
  }

  useEffect(() => {
    if (play) playSequence();
    else clearTimeout(delay)
  }, [play])
}

```
