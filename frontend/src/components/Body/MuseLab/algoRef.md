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
      <Track key={index} bpm={bpm} master={master} track={sequenceState[index]}/>
    ))}
  )
}

//Button Component
const Track = ({bpm, track}) => {
  const currentTrack = SequenceState

  const [play, setPlay] = useState(false);

  const [beat, setBeat] = useRef(0)
  const [beatSpeed, setBeatSpeed] = useState(60000 / bpm)

  const [step, setStep] = useState(1/2)
  const [stepSpeed, setStepSpeed] = useState(beatSpeed * step);

  const [note, setNote] = useRef(0)
  const [blockSequence, setBlockSequence] = useState([note1, note2, note3, note4])
  const [subNoteSpeed, setSubNoteSpeed] = (noteSpeed / blockSequence.length);

  const trackSequencer = setInterval(checkBlock(beat), stepSpeed);
  

  const checkBlock = (beat) => {
    const currentBlock = 
    const blockSequencer = setInterval(playNote(), subNoteSpeed);
    let subNote = 0
    const playNote = () => {

    }
    setBeat(beat++)
  }

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
