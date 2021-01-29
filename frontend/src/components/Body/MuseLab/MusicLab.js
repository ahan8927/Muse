import React, { useEffect, useState } from 'react';
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
  const initialState = {}
  initialState['sequences'] = {}
  for (let i = 0; i < 16; i++) {
    const state = {
      sequenceTitle: '',
      sequenceData: null,
      multiplier: 1,
      // color: '#293847',
      color: '#AFB1D4',
    }

    initialState['sequences'][i] = state
  }
  initialState['projectName'] = ''
  initialState['bpm'] = 857
  return initialState
}

const MusicLab = (props) => {
  const classes = useStyles();

  const [beatPads] = useState(16);
  const [sequenceState, setSequenceState] = useState(props.beatPadData ? props.beatPadData : setInitialState());
  const [openDialog, setOpenDialog] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [bpm, setBpm] = useState(sequenceState.bpm ? sequenceState.bpm : 1000)
  // const [bpm, setBpm] = useState(857)

  //DIALOG Functions
  const handleClose = () => {
    setOpenDialog(null);
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.grid}
      >
        {Object.values(sequenceState.sequences).map((sequenceKeys, i) => (
          <Grid item key={i}>
            <BeatButton
              index={i}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              // setSequenceState={setSequenceState}
              sequenceState={sequenceState}
              bpm={bpm}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={(openDialog !== null) ? true : false}
        onBackdropClick={() => setOpenDialog(null)}
        fullWidth={true}
        maxWidth={'md'}
      >
        {
          (openDialog !== null) && (
            <Sequencer
              index={openDialog}
              bpm={bpm}
              setSequenceState={setSequenceState}
              sequenceState={sequenceState}
              handleClose={handleClose}
            />
          )
        }
      </Dialog>
    </>
  );
}

export default MusicLab;
