import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

//Components
import soundLibrary, { createTempSequence } from './SoundLibrary';
import * as soundTools from './SoundTools';
import Block from './Block';
import NoteCard from './Note';

//MUI
import { Button, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    margin: '1rem',

    minHeight: '10rem',
    minWidth: '10rem',
  },
  blockList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    margin: '0',
    padding: '0',

    listStyle: 'none',
    border: 'solid',
  },
  blockItem: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  noteList: {
    margin: '1rem',
    padding: '0',

    listStyle: 'none',
    border: 'solid red',
  },
  noteItem: {
    display: 'flex',
    justifyContent: 'center',

    minWidth: '5rem',

    backgroundColor: '#C6E0FF',
    margin: '0.5rem',
  },
}));

const initializeSequence = () => {
  const trackArr = []
  for (let i = 0; i > 4; i++) {
    trackArr.append([])
  }
  return trackArr;
}

const Sequencer = (props) => {
  const classes = useStyles();

  const [sequenceName, setSequenceName] = useState('');
  const [sequenceData, setSequenceData] = useState(createTempSequence()[0])
  // const [trackSequence, setTrackSequence] = useState(initializeSequence())
  const [isLoaded, setIsLoaded] = useState(false)

  const handleChange = (e, location) => {
    switch (location) {
      case 'name':
        setSequenceName(e.target.value)
        return;
    }
  }

  const handleSubmit = (e) => {
    console.log('submitted')
    props.handleClose()
  }

  const handleDragEnd = (result) => {
    console.log(result)
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <TextField required align='center' id="standard-basic" label="Sequence Name" value={sequenceName} onChange={(e) => handleChange(e, 'name')} />

        <ul className={classes.blockList}> {/* Track */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <li className={classes.blockItem}> {/* block */}

              <Droppable droppableId='notes'>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={classes.noteList}
                  >
                    {sequenceData.track[0].map((note, index) => {
                      return (
                        <Draggable key={index} draggableId={`${note.library}-${note.name}-${index}`} indx={index}>
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={classes.noteItem}
                            >
                              <Typography>{note.name}</Typography>
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </li>
          </DragDropContext>
        </ul>

        {/* <Block id='block-1'>
                  <NoteCard id='card-1'>
                    <Typography>Sound 1</Typography>
                  </NoteCard>
                  <NoteCard id='card-2'>
                    <Typography>Sound 2</Typography>
                  </NoteCard>
                </Block>

                <Block id='block-2'>
                  <NoteCard id='card-3'>
                    <Typography>Sound 3</Typography>
                  </NoteCard>
                  <NoteCard id='card-4'>
                    <Typography>Sound 4</Typography>
                  </NoteCard>
                </Block> */}

        <Button
          onClick={handleSubmit}
        ><Typography>Submit</Typography></Button>
      </form>
    </div>
  );
}

export default Sequencer;
