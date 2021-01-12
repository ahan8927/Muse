import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

//Components
import DynamicCheckboxes from './DynamicSequenceRows';
import soundLibrary from './SoundLibrary';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const setInitializeState = (initialArr, row, col) => {
  let arr = []
  for (let i = 0; i < row; i++) {
    arr.push({})
    for (let j = 0; j < col; j++) {
      arr[i][j] = false
    }
  }

  return arr
}

const setSoundArr = (library) => {
  const soundArr = []
  for (let i = 0; i < soundLibrary[`${library}`].length; i++) {
    soundArr.push(new Tone.Player(soundLibrary[`${library}`][i].file))
  }
  return soundArr
}

const Sequencer = (props) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false)
  const [tempo, setTempo] = useState(8)
  const [sequenceName, setSequenceName] = useState('');
  const [library, setLibrary] = useState('drum_set');
  const [sounds, setSounds] = useState(setSoundArr(library))
  const [rows, setRows] = useState((props.initialState ? props.initialState.length : 3));
  const [cols, setCols] = useState((props.initialState ? props.initialState[0].length : 8));
  const [checked, setChecked] = useState((props.initialState ? props.initialState : setInitializeState(rows, cols)))
  let index = 0;

  const createRows = (num) => {
    const rowArr = [];
    for (let i = 0; i < num; i++) {
      rowArr.push(
        <DynamicCheckboxes key={`Sequence-1_row-${i}`} cols={cols} setChecked={setChecked} checked={checked} currentRow={i} />
      )
    }
    return rowArr
  }


  const gain = new Tone.Gain(0.6);

  gain.toDestination();
  // synths.forEach(synth => synth.connect(gain));

  const repeater = (time) => {
    let step = index % cols;

    console.log('Step: ', step)
    for (let i = 0; i < rows; i++) {
      const currentRowCheck = checked[i][step]
      const currentSound = sounds[i]

      if (currentRowCheck) {
        console.log(currentSound)
        currentSound.start();
      }
    }
    index++;
  }

  const handleChange = (e) => {
    setSequenceName(e.target.value)
  }

  const handleLibraryChange = (e) => {
    setLibrary(e.target.value)
  }

  const handleSubmit = (e) => {
    props.setPlay(false)
    const sequenceData = {
      sequenceTitle: sequenceName,
      beats: [ //length determines # of rows.
        {
          soundName: 'tophat',
          soundFile: 'path',
          beat: [false, true, false, false, true, false, false, true] //length determines # of cols
        }
      ],
      stepSpeed: '8n',
      color: '#293847',
    }
    console.log(sequenceData)
  }

  useEffect(() => {
    Tone.Transport.scheduleRepeat(repeater, `${tempo}n`);
    props.setPlay(true)
  }, [])

  useEffect(() => {
    setSounds(setSoundArr(library))
  }, [library])

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField align='center' id="standard-basic" label="Sequence Name" value={sequenceName} onChange={handleChange} />
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="select_library">
            Library
        </InputLabel>
          <Select
            labelId="select_library"
            id="demo-simple-select-placeholder-label"
            value={library}
            onChange={handleLibraryChange}
          >
            {Object.keys(soundLibrary).map((libraryy) => {
              return (
                <MenuItem value={libraryy}><Typography>{libraryy}</Typography></MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {createRows(rows)}
            </TableBody>
          </Table>
        </TableContainer>
        <Button type='submit'><Typography>Submit</Typography></Button>
      </form>
    </>
  );
}

export default Sequencer;
