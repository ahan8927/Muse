import React, { useState, useEffect } from 'react';

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
  root: {

  },
  row: {

  }
}))

const DynamicCheckboxes = ({ rows, cols }) => {
  const classes = useStyles()

  const [checked, setChecked] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  //temp initializer
  let state = {};

  //configures state based on unique checkbox name.
  const handleChange = (e) => {
    const value = {
      ...checked,
      [e.target.id]: e.target.checked,
    }
    setChecked(value)
  };


  const createBoxes = (row, col) => {
    let rowArr = [];

    for (let i = 0; i < row; i++) {
      let checkboxArr = []

      for (let j = 0; j < col; j++) {
        checkboxArr.push(
          <Checkbox
            key={`row-${i}-checkbox-${j}`}
            id={`row-${i}-checkbox-${j}`} //unique identifier in the state.
            className={`sequencer_row-${i}`}
            checked={checked[`row-${i}-checkbox-${j}`]}
            onChange={(e) => handleChange(e)}
          />
        )

        //store temp state so that react useState is given a list of initialized 'controlled' states.
        state[`row-${i}-checkbox-${j}`] = false;
      }

      rowArr.push(
        <div key={`row-${i}`} className={classes.row}>
          <Typography>{`Sound ${i}`}</Typography>

          {/* JSX array */}
          {checkboxArr}
        </div>
      )
    }

    // JSX array
    return rowArr
  }

  //output as a jsx array of 'x row divs' contiaining 'y checkboxes'
  const sequenceData = createBoxes(rows, cols)

  //upon 
  useEffect(() => {
    setChecked(state)
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      {sequenceData}
    </>
  );
}

export default DynamicCheckboxes
