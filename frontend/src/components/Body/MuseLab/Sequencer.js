import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

//Components
import DynamicCheckboxes from './DynamicSequenceRows';
import soundLibrary from './SoundLibrary';
import * as soundTools from './SoundTools';

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
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Sequencer = (props) => {
  const currentSequenceState = props.sequenceState[props.index]
  const classes = useStyles();

  const [library, setLibrary] = useState('drum_set');
  const [sequenceName, setSequenceName] = useState('');
  const [tempo, setTempo] = useState(8);
  // const [play, setPlay] = useState(false)

  // const [sounds, setSounds] = useState(soundTools.createSoundArr(library))
  const sound = true
  const [rows, setRows] = useState((currentSequenceState.beats ? currentSequenceState.beats.length : 3));
  const [cols, setCols] = useState((currentSequenceState.beats ? currentSequenceState.beats[0].beat.length : 8));
  const [checked, setChecked] = useState(setInitializeState(rows, cols))
  let index = 0;

  function setInitializeState(row, col) {
    console.log('Creating checkboxes with: ', row, col)
    let arr = []
    for (let i = 0; i < row; i++) {
      arr.push([])
      for (let j = 0; j < col; j++) {
        if (currentSequenceState.beats) {
          arr[i][j] = currentSequenceState.beats[i].beat[j]
        } else {
          arr[i][j] = false
        }
      }
    }
    return arr
  }

  const createRows = (num) => {
    const rowArr = [];
    for (let i = 0; i < num; i++) {
      rowArr.push(
        <DynamicCheckboxes key={`Sequence-${props.index}_row-${i}`} cols={cols} setChecked={setChecked} checked={checked} currentRow={i} />
      )
    }
    return rowArr
  }

  const repeater = (time) => {
    let step = index % cols;

    console.log('Step: ', step)
    for (let i = 0; i < rows; i++) {
      const currentRowCheck = checked[i][step]
      const currentSound = sounds[i]
      currentSound.connect(soundTools.gain)

      if (currentRowCheck) {
        currentSound.start();
      }
    }
    index++;
  }

  const handleChange = (e, location) => {
    switch (location) {
      case 'name':
        setSequenceName(e.target.value)
        return;
      case 'library':
        setLibrary(e.target.value)
        return;
      case 'tempo':
        console.log('changing tempo: ', e.target.value)
        setTempo(e.target.value)
        return;
    }
  }

  const handleLibraryChange = (e) => {
    setLibrary(e.target.value)
  }

  const handleSubmit = (e) => {
    // setPlay(false)
    if (!sequenceName) return;
    const beats = []
    soundLibrary[library].map((sound, index) => {
      beats.push(
        {
          soundName: sound.name,
          soundFile: sound.file,
          beat: checked[index],
        }
      )
    })
    const sequenceData = {
      sequenceTitle: sequenceName,
      beatPad: props.index,
      library: library,
      beats: beats,
      stepSpeed: tempo,
      color: '#293847',
    }
    props.sequenceState[props.index] = sequenceData;
    props.setSequenceState(props.sequenceState, props.handleClose())
  }






  // useEffect(() => {
  //   Tone.Transport.scheduleRepeat(repeater, `${tempo}n`);
  //   setPlay(true)
  // }, [])

  // useEffect(() => {
  //   setSounds(soundTools.createSoundArr(library))
  // }, [library])

  // useEffect(() => {
  //   if (play && currentSequenceState.beats) {
  //     Tone.Transport.start()
  //   } else {
  //     Tone.Transport.stop()
  //     Tone.Transport.clear()
  //   }
  // }, [play])








  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <TextField required align='center' id="standard-basic" label="Sequence Name" value={sequenceName} onChange={(e) => handleChange(e, 'name')} />
          <InputLabel shrink id="select_library">
            Library
        </InputLabel>
          <Select
            labelId="select_library"
            id="demo-simple-select-placeholder-label"
            value={library}
            onChange={e => handleChange(e, 'library')}
          >
            {Object.keys(soundLibrary).map((libraryy) => {
              return (
                <MenuItem key={libraryy} value={libraryy}><Typography>{libraryy}</Typography></MenuItem>
              )
            })}
          </Select>
          <Typography id="discrete-slider" gutterBottom>
            Tempo
      </Typography>
          <Slider
            defaultValue={tempo}
            onChange={e => handleChange(e, 'tempo')}
            getAriaValueText={value => `${value} notes`}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={2}
            marks
            min={2}
            max={16}
          />

        </FormControl>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {createRows(rows)}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={handleSubmit}
        ><Typography>Submit</Typography></Button>
      </form>
    </>
  );
}

export default Sequencer;
