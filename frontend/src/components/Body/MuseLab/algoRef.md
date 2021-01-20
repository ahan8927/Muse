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
      <Track key={index} bpm={bpm} master={master} buttonTrack={sequenceState[index]}/>
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
const Track = ({bpm, buttonTrack}) => {
  const currentTrack = buttonTrack.track;

  const [play, setPlay] = useRef(false);

  const [beat, setBeat] = useRef(0)
  const [beatSpeed, setBeatSpeed] = useState(60000 / bpm)

  const [step, setStep] = useState(1/2)
  const [stepSpeed, setStepSpeed] = useState(beatSpeed * step);

  const blockSequence = useState(initializeBlockSequence(currentTrack))

  const trackSequencer = setInterval(checkBlock(currentTrack[beat]), stepSpeed);
  

  const checkBlock = (currentBlock) => {
    const subNoteSpeed = (stepSpeed / currentBlock.length);
    let subNote = 0
    const playNote = () => {
      if(subNote === currentBlock.length){
        clearInterval(blockSequencer);
      } else {
        const currentNote = currentBlock[subNote]
        currentNote.start()
        subNote++;
      }
    }
    const blockSequencer = setInterval(playNote(), subNoteSpeed);
    setBeat(beat++)
  }

  useEffect(() => {
    if (play) playSequence();
    else stopSequence();
  }, [play])

  useEffect(() => {
    setBeatSpeed((60000 / bpm), setStepSpeed(beatSpeed * step))
  }, [bpm])

  useEffect(() => {
    setStepSpeed(beatSpeed * step)
  }, [step])

  useEffect(() => {
    setSubNoteSpeed(beatSpeed / blockSequence.length)
  }, [blockSequence])

  return (
    <Block noteSpeed={noteSpeed}/>
  )
}

const Block = ({noteSpeed}) => {

  


}

```
