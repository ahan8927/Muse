import React, { useState } from 'react';

//Components
import BeatButton from './BeatButton';

//MUI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '10rem',
    maxHeight: '10rem',
    color: theme.palette.text.secondary,
  },
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

const MusicLab = () => {
  const classes = useStyles();
  const [beatPads, setBeatPads] = useState(16);

  //Grid Creation
  const createBeatPad = () => {
    const loop = []
    loop.push(
      <Grid item key={0}>
        <BeatButton index={0} />
      </Grid>
    )
    for (let i = 1; i < beatPads; i++) {
      loop.push(
        <Grid item key={i}>
          <BeatButton index={i} />
        </Grid>
      )
    }
    console.log(loop)
    return loop
  }

  return (
    <>
      <Grid
        container
        // direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.grid}
      >
        {createBeatPad()}
      </Grid>
    </>
  );
}

export default MusicLab;
