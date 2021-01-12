import React, { useState, useEffect } from 'react';

//MUI
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const DynamicCheckboxes = ({ setChecked, checked, cols, currentRow }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleChange = (e) => {
    const rowNum = e.target.id.split('-')[1]
    const colNum = e.target.id.split('-')[3]

    checked[rowNum][colNum] = e.target.checked
    setChecked(checked)
  };

  const createCol = (num) => {
    let checkboxArr = []
    for (let i = 0; i < num; i++) {
      checkboxArr.push(
        <TableCell align='center' key={`row-${currentRow}-checkbox-${i}`}>
          <Checkbox
            id={`row-${currentRow}-checkbox-${i}`} //TODO: may conflict when adding another sequence.
            className={`sequencer_row-${i}_checkbox`}
            onChange={(e) => handleChange(e)}
          />
        </TableCell >
      )
    }

    return checkboxArr
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <TableRow>
      <TableCell><Typography align='center' >{`Sound 1`}</Typography></TableCell>
      {createCol(cols)}
    </TableRow>
  );
}

export default DynamicCheckboxes
