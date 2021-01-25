import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

//Components
import { soundLibrary } from './SoundLibrary';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const BeatButton = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [play, setPlay] = useState(false);
  const [buffer, setBuffer] = useState({})
  const [delay, setDelay] = useState()

  const { track, bpm, multiplier, color, sequenceTitle } = props.currentTrack

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${color}`
    }
  }));
  const classes = useStyles();

  const initializeBuffer = () => {
    const placeHolder = {}
    if (track) {
      track.forEach((currentBlock) => {
        currentBlock.forEach((note) => {
          Object.assign(placeHolder, { [note.name]: soundLibrary[note.library][note.name] })
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => setBuffer(bufferDict))
    setIsLoaded(true)
  }

  function playTrack(track) {
    let currentBlock = 0;

    (function playBlock() {

      let currentNote = 0
      const noteSpeed = track[currentBlock].length ? ((bpm * multiplier) / track[currentBlock].length) : (bpm * multiplier)
      if (currentBlock <= track.length - 1) {
        playNote()
      } else {
        return;
      }

      function playNote() {
        const { library, name } = track[currentBlock][currentNote]

        const currentSound = new Tone.Player(buffer.get(name).get()).toDestination()
        currentSound.start()

        currentNote++;
        if (currentNote < track[currentBlock].length) {
          setDelay(setTimeout(playNote, noteSpeed));
        } else {
          currentBlock++
          if (currentBlock < track.length) {
            setDelay(setTimeout(playBlock, noteSpeed))
          } else {
            setDelay(setTimeout(() => playTrack(track), noteSpeed))
          }
        }
      }
    })()
  }

  useEffect(() => {
    console.log('Play!: ', play)
    if (track) {
      if (play) {
        playTrack(track)
      } else {
        clearTimeout(delay);
      }
    } else {
      props.setOpenDialog(props.index)
    }
  }, [play])

  useEffect(() => {
    initializeBuffer()
  }, [])

  return isLoaded && (
    <>
      <Button className={classes.button} onClick={() => track ? setPlay(!play) : props.setOpenDialog(props.index)}>
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
