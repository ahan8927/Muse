import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(() => ({
  root: {
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  soundName: {
    display: 'flex',
    alignItems: 'center',
  },

}));

const initializeState = (row, col) => {
  let arr = []
  for (let i = 0; i < row; i++) {
    arr.push({})
    for (let j = 0; j < col; j++) {
      arr[i][`row-${i}-checkbox-${j}`] = false
    }
  }
  return arr
}

const DynamicCheckboxes = ({ rows, cols }) => {
  const classes = useStyles()

  const [checked, setChecked] = useState(initializeState(rows, cols))
  const [isLoaded, setIsLoaded] = useState(false)
  const gain = new Tone.Gain(0.6);

  const synths = [
    new Tone.Player('sounds/Hats32.wav'),
    new Tone.Player('sounds/CYCdh_K5-Rim03.wav'),
    new Tone.Player('sounds/kick.wav'),
  ]

  gain.toDestination();
  synths.forEach(synth => synth.connect(gain));

  let index = 0;

  //configures state based on unique checkbox name.
  const handleChange = (e) => {
    const rowNum = e.target.id.split('-')[1]

    checked[rowNum][e.target.id] = e.target.checked
    setChecked(checked, console.log('Current state: ', checked))
  };

  const repeater = (time) => {
    let step = index % cols;

    console.log('Step: ', step)
    for (let i = 0; i < rows; i++) {
      const currentRowCheck = Object.values(checked[i])[step]
      const sound = synths[i]

      if (currentRowCheck) sound.start();
      // if (currentRowCheck) synths[0].triggerAttackRelease('16n', time);
    }
    index++;
  }




  //sdfsd
  //sdf
  useEffect(() => {
    setIsLoaded(true)
    Tone.Transport.scheduleRepeat(repeater, '8n');
    Tone.Transport.start()
    console.log('UseEffect running')
  }, [])

  return isLoaded && (
    <>
      {checked.map((row, i) => {
        row = Object.values(row)

        let checkboxArr = []
        row.map((col, j) => {
          checkboxArr.push(
            <Checkbox
              key={`row-${i}-checkbox-${j}`}
              id={`row-${i}-checkbox-${j}`} //unique identifier in the state.
              className={`sequencer_row-${i}_checkbox`}
              onChange={(e) => handleChange(e)}
            />
          )
        })

        return (
          <div key={`row-${i}`} className={classes.row}>
            <Typography align='center' className={classes.soundName}>{`Sound ${i}`}</Typography>
            {checkboxArr}
          </div>
        )
      })}
    </>
  );
}

export default DynamicCheckboxes
