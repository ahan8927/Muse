import React, { useState, useContext, useEffect } from 'react';
import * as Tone from 'tone';

//Components
import ButtonData from './ButtonData';
import { DialogContext } from '../../../context/context';
import Sequencer from './Sequencer';

//MUI
import { Button, makeStyles, Typography, Dialog } from '@material-ui/core';

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
    default:
      return;
  }
}

const BeatButton = ({ index }) => {
  const { dialogContext, setDialogContext } = useContext(DialogContext);
  const [whichDialog, setWhichDialog] = useState('');
  const [hasState, setHasState] = useState([])
  const [buttondata, setButtonData] = useState(ButtonData(index))
  const [play, setPlay] = useState(false)

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${buttondata.color}`
    }
  }));
  const classes = useStyles();

  //DIALOG Functions
  const handleClose = () => {
    setDialogContext(false);
    setPlay(false)
  }

  const handleClick = () => {
    // (hasState) ? setPlay(true) : setDialogContext(true)
    console.log(`hasState: ${(hasState.length < 1) ? false : true}, `, hasState)
    if (hasState.length < 1) {
      setDialogContext(true)
    } else {
      setPlay(true)
    }
  }

  useEffect(() => {
    console.log(play)
    play ? Tone.Transport.start() : Tone.Transport.stop()
  }, [play])

  return (
    <>
      <Button className={classes.button} onClick={() => handleClick()}>
        <Typography>{buttondata.name} {index}</Typography>
      </Button>
      <Dialog open={dialogContext} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
        <Sequencer setPlay={setPlay} />
      </Dialog>
    </>
  );
}

export default BeatButton;

/*

const sequenceData = {
  sequenceTitle: 'Sequence1',
  beats: [ //length determines # of rows.
    {
      soundName: 'tophat',
      soundFile: 'path',
      beat: [true, false, true, false, true, false, true] //length determines # of cols
    }
  ],
  stepSpeed: '8n',
  color: '#293847',
}
*/
