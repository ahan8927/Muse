import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
  root: {

  },
  row: {

  }
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
  const [sequenceData, setSequenceData] = useState(createBoxes(rows, cols))
  const [isLoaded, setIsLoaded] = useState(false)
  const gain = new Tone.Gain(0.6);

  const synths = [
    new Tone.Player('sounds/Hats32.wav'),
    new Tone.Player('sounds/CYCdh_K5-Rim03.wav'),
    new Tone.Player('sounds/kick.wav'),
  ]

  // const synths = [
  //   new Tone.Synth(),
  //   new Tone.Synth(),
  //   new Tone.Synth()
  // ]

  // synths[0].oscillator.type = 'triangle';
  // synths[1].oscillator.type = 'sine';
  // synths[2].oscillator.type = 'sawtooth';

  gain.toDestination();
  synths.forEach(synth => synth.connect(gain));

  let index = 0;
  const notes = ['G5', 'E4', 'C3',]

  //configures state based on unique checkbox name.
  const handleChange = (e) => {
    const rowNum = e.target.id.split('-')[1]

    checked[rowNum][e.target.id] = e.target.checked
    setChecked(checked, console.log('Current state: ', checked))
  };

  function createBoxes(row, col) {
    let rowArr = [];

    for (let i = 0; i < row; i++) {
      let checkboxArr = []

      for (let j = 0; j < col; j++) {
        // console.log(Object.values(checked[i])[j])
        checkboxArr.push(
          <Checkbox
            key={`row-${i}-checkbox-${j}`}
            id={`row-${i}-checkbox-${j}`} //unique identifier in the state.
            className={`sequencer_row-${i}_checkbox`}
            checked={Object.values(checked[i])[j]}
            onChange={(e) => handleChange(e)}
          />
        )
      }

      rowArr.push(
        <div key={`row-${i}`} className={[classes.row, 'sequencer_row']}>
          <Typography>{`Sound ${i}`}</Typography>
          {checkboxArr}
        </div>
      )
    }
    // JSX array
    return rowArr
  }

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

  Tone.Transport.scheduleRepeat(repeater, '8n');
  Tone.Transport.start()


  useEffect(() => {
    setIsLoaded(true)
  }, [checked])

  // useEffect(() => {
  //   Tone.Transport.start()
  // }, [])

  console.log('Reloaded: ', checked, '\nIsLoaded: ', isLoaded)

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
          <div key={`row-${i}`} className={[classes.row, 'sequencer_row']}>
            <Typography>{`Sound ${i}`}</Typography>
            {checkboxArr}
          </div>
        )
      })}
    </>
  );
}

export default DynamicCheckboxes
