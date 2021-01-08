import React from 'react';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';



const BeatButton = (props) => {

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      color: `${props.color}`
    }
  }))
  const classes = useStyles();

  return (
    <Button className={classes.button}>
      <Typography>Beat 1</Typography>
    </Button>
  );
}

export default BeatButton;
