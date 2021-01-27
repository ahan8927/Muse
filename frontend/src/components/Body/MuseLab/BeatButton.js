import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

//Components
import soundLibrary from './SoundLibrary';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const BeatButton = (props) => {
  const currentSequence = props.sequenceState.sequences[props.index]

  const [sequenceName, setSequenceName] = useState(currentSequence.sequenceTitle ? currentSequence.sequenceTitle : '');
  const [sequenceData, setSequenceData] = useState((currentSequence.sequenceData !== null) ? currentSequence.sequenceData : null);

  const [multiplier] = useState(currentSequence.multiplier ? currentSequence.multiplier : 1);
  const [bpm] = useState(props.sequenceState.bpm ? props.sequenceState.bpm : 1000);

  const [play, setPlay] = useState(false)
  const [buffer, setBuffer] = useState({})
  const [delay, setDelay] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  function initializeBuffer() {
    const placeHolder = {}
    if (sequenceData) {
      Object.values(sequenceData.columns).forEach(blockData => {
        blockData.taskIds.forEach(noteId => {
          const { name, library } = sequenceData.tasks[noteId]
          placeHolder[name] = soundLibrary[library][name] //file path
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => setBuffer(bufferDict))
  }

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${props.sequenceState.sequences[props.index].color}`
    }
  }));
  const classes = useStyles();

  function playTrack() {
    let currentBlock = 0;

    (function playBlock() {
      let currentNote = 0
      const currentBlockData = sequenceData.columns[sequenceData.columnOrder[currentBlock]]

      let noteSpeed = 0
      if (currentBlockData.taskIds.length > 0) {
        noteSpeed = (bpm * multiplier) / currentBlockData.taskIds.length
        playNote()
      } else {
        noteSpeed = bpm * multiplier
        currentBlock++
        if (currentBlock < sequenceData.columnOrder.length) {
          setDelay(setTimeout(playBlock, noteSpeed))
        } else {
          setDelay(setTimeout(() => playTrack(), noteSpeed))
        }
      }

      function playNote() {
        const { name } = sequenceData.tasks[currentBlockData.taskIds[currentNote]]

        const currentSound = new Tone.Player(buffer.get(name).get()).toDestination()
        currentSound.start()

        currentNote++;
        if (currentNote < currentBlockData.taskIds.length) {
          setDelay(setTimeout(playNote, noteSpeed));
        } else {
          currentBlock++
          if (currentBlock < sequenceData.columnOrder.length) {
            setDelay(setTimeout(playBlock, noteSpeed))
          } else {
            setDelay(setTimeout(() => playTrack(), noteSpeed))
          }
        }
      }
    })()
  }

  useEffect(() => {
    if (play) {
      playTrack()
    } else {
      clearTimeout(delay);
    }
  }, [play])

  useEffect(() => {
    setIsLoaded(false)
    setSequenceName(currentSequence.sequenceTitle, setSequenceData(currentSequence.sequenceData, (() => {
      initializeBuffer()
      setIsLoaded(true)
    })()))
  }, [props])

  return isLoaded && (
    <>
      <Button className={classes.button} onClick={() => sequenceData ? setPlay(!play) : props.setOpenDialog(props.index)}>
        {
          // (!isLoaded)
          //   ? <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          (sequenceData)
            ? <Typography>{sequenceName}</Typography>
            : <AddIcon />
        }
      </Button>

    </>
  );
}

export default BeatButton;
