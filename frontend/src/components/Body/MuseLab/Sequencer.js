import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

//Components
import DynamicCheckboxes from './DynamicSequenceRows';
// import StaticCheckboxes from './StaticSequenceRows'

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {

  }
}))


const Sequencer = () => {
  const classes = useStyles();

  const [sequenceName, setSequenceName] = useState('');

  const handleChange = (e) => {
    setSequenceName(e.target.value)
  }

  const handleSubmit = (e) => {
    const sequenceData = {
      sequenceTitle: 'Sequence1',
      beats: [ //length determines # of rows.
        {
          soundName: 'tophat',
          soundFile: 'path',
          beat: [true, false, true, false, true, false, true, false] //length determines # of cols
        }
      ],
      stepSpeed: '8n',
      color: '#293847',
    }
    console.log(sequenceData)
  }

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField align='center' id="standard-basic" label="Sequence Name" value={sequenceName} onChange={handleChange} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          </Table>
        </TableContainer>
      </form>

      <DynamicCheckboxes rows={3} cols={8} />
    </>
  );
}

export default Sequencer;
