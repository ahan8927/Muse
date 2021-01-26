import React, { useState } from 'react';
import styled from 'styled-components';

//Components
import BeatButton from './BeatButton';
import Sequencer from './Sequencer'

//MUI
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '43rem',
    height: '43rem',
  },
  createButton: {
    width: '10rem',
    height: '10rem',
    backgroundColor: 'white',
  },
}));
const setInitialState = () => {
  const initialState = []
  for (let i = 0; i < 16; i++) {
    initialState.push({
      sequenceTitle: '',
      track: null,
      bpm: 60,
      multiplier: 1,
      color: '#293847',
    })
  }
  return initialState
}

const MusicLab = (props) => {
  const classes = useStyles();

  const [beatPads] = useState(16);
  const [sequenceState, setSequenceState] = useState(props.beats ? props.beats : setInitialState());
  // const [sequenceState, setSequenceState] = useState(createTempSequence());
  const [openDialog, setOpenDialog] = useState(null)

  //DIALOG Functions
  const handleClose = () => {
    setOpenDialog(null);
  }

  //Grid Creation
  const createBeatPad = () => {
    const loop = []
    const buttonSettings = {
      openDialog,
      setOpenDialog,
      setSequenceState
    }
    for (let i = 0; i < beatPads; i++) {
      buttonSettings['index'] = i
      buttonSettings['currentTrack'] = sequenceState[i]
      loop.push(
        <Grid item key={i}>
          <BeatButton {...buttonSettings} />
        </Grid>
      )
    }
    return loop
  }

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.grid}
      >
        {createBeatPad()}
      </Grid>
      <Dialog
        open={openDialog ? true : false}
        onBackdropClick={() => setOpenDialog(false)}
        fullWidth={true}
        maxWidth={'md'}
      >
        {/* <DialogContent> */}
        <Sequencer
          index={openDialog}
          setSequenceState={setSequenceState}
          sequenceState={sequenceState}
          handleClose={handleClose}

        />
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
}

export default MusicLab;
