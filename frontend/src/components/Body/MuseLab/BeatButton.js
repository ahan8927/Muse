import React, { useState } from 'react';
import * as Tone from 'tone';

//Components
import ButtonData from './ButtonData'

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';


const BeatButton = (props) => {
  const [selected, setSelected] = useState(false);
  const [hasState, setHasState] = useState([])
  const [buttondata, setButtonData] = useState(ButtonData(props.index))

  const useStyles = makeStyles(() => ({
    button: {
      width: '10rem',
      height: '10rem',
      backgroundColor: `${buttondata.color}`
    }
  }))
  const classes = useStyles();

  const handleClick = () => {
    // buttondata.sound.start()
  }

  return (
    <Button className={classes.button} onClick={() => handleClick()}>
      <Typography>{buttondata.name} {props.index}</Typography>
    </Button>
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
