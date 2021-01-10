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

const StaticCheckboxes = () => {
  const classes = useStyles()

  const [checked, setChecked] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  //temp initializer
  let state = {};

  //configures state based on unique checkbox name.
  const handleChange = (e) => {
    const value = {
      ...checked,
      [e.target.name]: e.target.checked,
    }
    setChecked(value)
  };


  const createBoxes = () => {
    let checkboxArr = []

    for (let j = 0; i < 8; j++) {
      checkboxArr.push(
        <Checkbox
          name={`row-${i}-checkbox-${j}`} //unique identifier in the state.
          checked={checked[`row-${i}-checkbox-${j}`]}
          onChange={(e) => handleChange(e)}
        />
      )

      //store temp state so that react useState is given a list of initialized 'controlled' states.
      state[`row-${i}-checkbox-${j}`] = false;
    }
  }

  // JSX array
  return checkboxArr
}

const createRows = () => {
  let rowArr = []
  rowArr.push(
    <div className={classes.row}>
      <Typography>{`Sound ${i}`}</Typography>
      {checkboxArr()}
    </div>
  )
}

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

export default StaticCheckboxes
