import React, { useState, useContext, useEffect } from 'react';
import * as Tone from 'tone';

//Components
import { DialogContext } from '../../../context/context';
import * as soundTools from './SoundTools';
import Sequencer from './Sequencer';

//MUI
import { Button, makeStyles, Typography, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';



const BeatButton = ({ index }) => {
  const { dialogContext, setDialogContext } = useContext(DialogContext);
  const [whichDialog, setWhichDialog] = useState('');
  const [sequenceState, setSequenceState] = useState();
  const [sounds, setSounds] = useState(sequenceState ? soundTools.createSoundArr(sequenceState.library) : [])
  const [play, setPlay] = useState(false)

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      // backgroundColor: `${buttondata.color}`
    }
  }));
  const classes = useStyles();

  //DIALOG Functions
  const handleClose = () => {
    setDialogContext(false);
    setPlay(false)
  }

  const handleClick = () => {
    console.log('BUTTON CLICKED')
    if (sequenceState) {
      setPlay(!play)
    } else {
      setDialogContext(true)
    }
  }

  let step = 0;
  const repeater = (time) => {
    const rows = sequenceState.beats.length
    const cols = sequenceState.beats[0].beat.length
    let index = step % cols;

    for (let i = 0; i < rows; i++) {
      const currentRowCheck = sequenceState.beats[i].beat[index]
      const currentSound = sounds[i]
      currentSound.connect(soundTools.gain)

      if (currentRowCheck) {
        currentSound.start();
      }
    }
    step++;
  }

  useEffect(() => {
    if (sequenceState && sounds) {
      setSounds(soundTools.createSoundArr(sequenceState.library))
    }
  }, [sequenceState])

  useEffect(() => {
    if (play && sequenceState) {
      Tone.Transport.start()
    } else {
      Tone.Transport.stop()
      Tone.Transport.clear()
    }
  }, [play])

  return (
    <>
      <Button className={classes.button} onClick={() => handleClick()}>
        {
          sequenceState
            ? <Typography>{sequenceState.sequenceTitle}</Typography>
            : <AddIcon />
        }

      </Button>
      <Dialog open={dialogContext} className={classes.dialog} aria-labelledby="form-dialog-title">
        <Sequencer
          setPlay={setPlay}
          index={index}
          setSequenceState={setSequenceState}
          sequenceState={sequenceState}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
}

export default BeatButton;
