import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/actions/session';
import styled from 'styled-components';

//Components
import BeatButton from './BeatButton';
import Sequencer from './Sequencer'

//MUI
import { Button, Dialog, DialogContent, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

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
  title: {
    color: '#AFB1D4',
    textAlign: 'center',
    "&::placeholder": {
      color: "#AFB1D4",
      textAlign: "center"
    }
  },
  bpm: {
    color: '#AFB1D4',
    textAlign: 'center',
    width: '5rem',
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
  const dispatch = useDispatch();

  const [beatPads] = useState(16);
  const user = useSelector(state => state.session.user)
  const [sequenceState, setSequenceState] = useState(props.beatPadData ? props.beatPadData : setInitialState());
  const [openDialog, setOpenDialog] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [bpm, setBpm] = useState(sequenceState.bpm ? sequenceState.bpm : 1000)

  //DIALOG Functions
  const handleClose = () => {
    setOpenDialog(null);
  }

  const handleChange = (e, target) => {
    switch (target) {
      case 'bpm':
        setBpm(e.target.value)
        break;
      case 'projectName':
        setProjectName(e.target.value)
        break;
    }
  }

  const handleSave = () => {
    console.log(user)
    dispatch(sessionActions.saveBoard(user.id, sequenceState))
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // console.log(sequenceState)

  return isLoaded && (
    <Root>
      <Header>
        <div style={{ display: 'flex', alignContent: 'center', }}>
          <Typography style={{ color: '#AFB1D4', marginTop: '.2rem', }}>BPM:</Typography>
          <TextField
            value={bpm}
            onChange={e => handleChange(e, 'bpm')}
            type="number"
            InputProps={{
              classes: { input: classes.bpm }
            }}
          />
        </div>
        <TextField
          value={projectName}
          onChange={e => handleChange(e, 'projectName')}
          placeholder={'Board Name'}
          InputProps={{
            classes: { input: classes.title }
          }}
        />
        <Button onClick={() => handleSave()}><Typography style={{ color: '#AFB1D4' }}>Save</Typography></Button>
      </Header>

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
    </Root>
  );
}

export default MusicLab;
