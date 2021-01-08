import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

//Components
import BeatButton from './BeatButton';
import { AudioContext } from '../../../context/context'
// import { colorPicker, randInt } from './ButtonData';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()

// const colors = {
//   color1: colorPicker(randInt),
//   color2: colorPicker(randInt),
//   color3: colorPicker(randInt),
//   color4: colorPicker(randInt),
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10rem',
    height: '10rem',
    color: theme.palette.text.secondary,
  },
  grid: {
    width: '43rem',
    height: '43rem',
  }
}));

const MusicLab = () => {
  const classes = useStyles();
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  // let isRecording = false;

  const loop = []
  for (let i = 0; i < 16; i++) {
    loop.push(
      <Grid item key={i}>
        <BeatButton index={i} />
      </Grid>
    )
  }


  const startRecord = () => {
    setIsRecording(true)
    synth.triggerAttack('C4', synth.context.currentTime)
  }

  const stopRecord = () => {
    setIsRecording(false)
    synth.triggerRelease('C4');
  }

  const startPlay = () => {
    setIsPlaying(true)
  }

  const stopPlay = () => {
    setIsPlaying(false)
  }

  return (
    // <AudioContext.provider>
    <>
      <div>
        {
          isRecording
            ? <Button onClick={() => stopRecord()}><Typography>Stop</Typography></Button>
            : <Button onClick={() => startRecord()}><Typography>Record</Typography></Button>
        }
        {
          isPlaying
            ? <Button onClick={() => stopPlay()}><Typography>Pause</Typography></Button>
            : <Button onClick={() => startPlay()}><Typography>Play</Typography></Button>
        }


      </div>
      <Grid
        container
        // direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.grid}
      >
        {loop}
      </Grid>
    </>
    // </AudioContext.provider>
  );
}

export default MusicLab;
