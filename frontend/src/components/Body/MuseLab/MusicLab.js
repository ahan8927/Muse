import { Typography } from '@material-ui/core';
import React from 'react';

//Components
import BeatButton from './BeatButton';
// import colorPicker from './colors';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // display: 'flex',
    // justifyContent: 'center',
  },
  paper: {
    // padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10rem',
    height: '10rem',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    width: '43rem',
    height: '43rem',
  }
}));

const MusicLab = () => {
  const classes = useStyles()

  const loop = []
  for (let i = 0; i < 16; i++) {
    loop.push(
      <Grid item>
        <BeatButton />
      </Grid>
    )
  }

  return (
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
  );
}

export default MusicLab;
