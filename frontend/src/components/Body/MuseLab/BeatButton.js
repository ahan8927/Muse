import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

//Components
import * as soundTools from './SoundTools';
//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const BeatButton = (props) => {
  const [library] = useState(props.sequenceState.library ? props.sequenceState.library : 'drum_set')
  const [sounds] = useState(library ? soundTools.createSoundArr(library) : null);
  const [color] = useState(props.sequenceState.color ? props.sequenceState.color : '#293847');
  const [play, setPlay] = useState(true);
  let step = 0;

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${color}`
    }
  }));
  const classes = useStyles();

  const handleClick = () => {
    if (props.sequenceState.beats) {
      const sequence = Tone.Transport.scheduleRepeat(repeater, `${props.sequenceState.stepSpeed}n`);
      // sequence()
      if (play) {
        // Tone.start()
        Tone.Transport.start()
        setPlay(!play)
      } else {
        Tone.Transport.stop()
        // Tone.Transport.clear(sequence)
        // step = 0
        setPlay(!play)
      }
    } else {
      props.setOpenDialog(props.index)
    }
  }

  //Music Sequence Player
  const repeater = (time) => {
    // const sounds = soundTools.createSoundArr(props.sequenceState[i].library)
    const rows = props.sequenceState.beats.length
    const cols = props.sequenceState.beats[0].beat.length
    let index = step % cols

    for (let j = 0; j < rows; j++) {
      const currentRowCheck = props.sequenceState.beats[j].beat[index]
      const currentSound = sounds[j]
      currentSound.connect(soundTools.gain)

      if (currentRowCheck) {
        currentSound.start(0);
      }
    }
    console.log('step: ', step)
    step++;
  }


  return (
    <>
      <Button className={classes.button} onClick={() => handleClick()}>
        {
          props.sequenceState.beats
            ? <Typography>{props.sequenceState.sequenceTitle}</Typography>
            : <AddIcon />
        }

      </Button>

    </>
  );
}

export default BeatButton;
