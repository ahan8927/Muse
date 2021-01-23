import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

//Components
import { soundLibrary } from './SoundLibrary';
import * as soundTools from './SoundTools';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const BeatButton = (props) => {
  // const [sounds] = useState(library ? soundTools.createSoundArr(library) : null);
  // const [color] = useState(props.sequenceState.color ? props.sequenceState.color : '#293847');
  const [isLoaded, setIsLoaded] = useState(false)
  const [play, setPlay] = useState(false);
  const [buffer, setBuffer] = useState({})
  const { track, bpm, multiplier, color, sequenceTitle } = props.currentTrack

  let delay;

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${color}`
    }
  }));
  const classes = useStyles();

  const handleClick = () => {
    (track.length > 0)
      ? play ? playTrack(track) : clearTimeout(delay)
      : props.setOpenDialog(props.index)
  }

  function playTrack(track) {
    console.log('Start!!, track length: ', track.length, '\n')
    let currentBlock = 0;

    (function playBlock() {
      // console.log('currentBlock: ', currentBlock)

      let currentNote = 0
      const noteSpeed = track[currentBlock].length ? ((bpm * multiplier) / track[currentBlock].length) : (bpm * multiplier)
      if (currentBlock <= track.length - 1) {
        playNote()
      } else {
        console.log('loop done');
        return;
      }

      function playNote() {
        // console.log('currentBlock: ', currentBlock, ' currentNote: ', currentNote, ' currentSpeed: ', noteSpeed)
        // play note
        const { library, name } = track[currentBlock][currentNote]
        const currentSound = soundTools.createSoundNode(library, name)
        currentSound.start()

        currentNote++;
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
    (play)
      ? playTrack(track)
      : clearTimeout(delay)
  }, [play])

  useEffect(() => {
    const buffer = new Tone.Buffer('sounds/808-snares/clap.wav', () => setBuffer(buffer, setIsLoaded(true)))
  }, [])

  return isLoaded && (
    <>
      {/* <Button className={classes.button} onClick={() => setPlay(!play)}> */}
      <Button className={classes.button} onClick={() => {
        const sound = new Tone.Player(buffer.get()).toDestination()
        sound.start()
      }}>
        {
          (track)
            ? <Typography>{sequenceTitle}</Typography>
            : <AddIcon />
        }

      </Button>

    </>
  );
}

export default BeatButton;
