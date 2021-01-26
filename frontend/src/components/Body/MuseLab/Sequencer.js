import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

//Components
import soundLibrary from './SoundLibrary';
import { initialData } from './test/test';
import Column from './test/Column';
import * as soundTools from './SoundTools';
import Library from './test/Library';

//MUI
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';










const Root = styled.div`
  background: #212121;
  padding: 4rem;
  width: fit-content;
`

const Container = styled.div`
 display: flex;
 width: fit-content;
//  border: solid red;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SequenceControls = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const useStyles = makeStyles(() => ({
  expandIcon: {
    colorPrimary: 'white',
  },
  accordion: {
    backgroundColor: '#212121'
  }
}))











const Sequencer = (props) => {
  const classes = useStyles()

  const [sequenceName, setSequenceName] = useState('');
  const [sequenceData, setSequenceData] = useState(initialData);
  const [trackData, setTrackData] = useState(converter(sequenceData))

  const [play, setPlay] = useState(false)
  const [bpm] = useState(1000);
  const [multiplier, setMultiplier] = useState(1);
  const [buffer, setBuffer] = useState({})
  const [delay, setDelay] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const initializeBuffer = (track) => {
    const placeHolder = {}
    if (track) {
      track.forEach((currentBlock) => {
        currentBlock.forEach((note) => {
          Object.assign(placeHolder, { [note.name]: soundLibrary[note.library][note.name] })
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => setBuffer(bufferDict))
    setIsLoaded(true)
  }

  const handleChange = (e, location) => {
    switch (location) {
      case 'name':
        setSequenceName(e.target.value)
        return;
      case 'multiplier':
        setMultiplier(e)
        return;
    }
  }

  const maxColumnId = () => {
    let max = 0;
    sequenceData.columnOrder.forEach((column, i) => {
      const currentId = parseInt(column.split('-')[1])
      if (currentId > max) max = currentId
    });

    return max
  }

  const handleNewBlock = () => {
    const newId = `block-${maxColumnId() + 1}`
    const newColumn = {
      id: newId,
      title: newId,
      taskIds: [],
    }

    const newState = {
      ...sequenceData,
      columns: {
        ...sequenceData.columns,
        [newId]: newColumn,
      },
      columnOrder: [
        ...sequenceData.columnOrder,
        newId
      ]
    }
    setSequenceData(newState, setTrackData(converter(sequenceData)));
  }

  const handleBlockDelete = () => {
    const idToDelete = sequenceData.columnOrder[sequenceData.columnOrder.length - 1]
    const newState = sequenceData;
    newState.columnOrder.pop()
    delete newState.columns[idToDelete]

    setSequenceData(newState, setTrackData(converter(sequenceData)));
  }

  const handleSubmit = () => {
    console.log('submitted')
    props.handleClose()
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    //will do nothing if you try to move into same columm
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(sequenceData.columnOrder);
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...sequenceData,
        columnOrder: newColumnOrder,
      }

      setSequenceData(newState, setTrackData(converter(sequenceData)));
      return;
    }

    const start = sequenceData.columns[source.droppableId];
    const finish = sequenceData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...sequenceData,
        columns: {
          ...sequenceData.columns,
          [newColumn.id]: newColumn,
        },
      }

      setSequenceData(newState, setTrackData(converter(sequenceData)));
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...sequenceData,
      columns: {
        ...sequenceData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setSequenceData(newState, setTrackData(converter(sequenceData)));
    return;
  }

  function converter(sequence) {
    console.log(sequence)
    const { tasks, columns, columnOrder } = sequence;
    const track = []

    columnOrder.map((block, i) => {
      const currentBlock = columns[block];
      const tempBlock = [];
      console.log(currentBlock);

      (currentBlock.taskIds.length > 0) && currentBlock.taskIds.map((note, j) => {
        const currentNote = tasks[note]
        const tempObj = {}

        tempObj['library'] = currentNote.library;
        tempObj['name'] = currentNote.name;

        tempBlock.push(tempObj);
      });


      track.push(tempBlock)
    });
    console.log(track)
    return track
  }

  function playTrack(track) {
    let currentBlock = 0;

    (function playBlock() {

      let currentNote = 0
      const noteSpeed = track[currentBlock].length ? ((bpm * multiplier) / track[currentBlock].length) : (bpm * multiplier)
      if (currentBlock <= track.length - 1) {
        playNote()
      } else {
        return;
      }

      function playNote() {
        const { library, name } = track[currentBlock][currentNote]
        console.log('currentBlock: ', currentBlock, ' currentNote: ', currentNote, ' currentSpeed: ', noteSpeed)

        const currentSound = new Tone.Player(buffer.get(name).get()).toDestination()
        currentSound.start()

        currentNote++;
        if (currentNote < track[currentBlock].length) {
          setDelay(setTimeout(playNote, noteSpeed));
        } else {
          currentBlock++
          if (currentBlock < track.length) {
            setDelay(setTimeout(playBlock, noteSpeed))
          } else {
            setDelay(setTimeout(() => playTrack(track), noteSpeed))
          }
        }
      }
    })()
  }













  useEffect(() => {
    initializeBuffer(trackData)
  }, [])

  useEffect(() => {
    if (trackData) {
      if (play) {
        playTrack(trackData)
      } else {
        clearTimeout(delay);
      }
    }
  }, [play])

  return isLoaded && (
    <Root>
      <Header>
        <TextField
          InputProps={{
            style: {
              width: '15rem',
              textAlign: 'center',
              color: 'white',
            }
          }}
          label="Sequence Name"
          value={sequenceName}
          onChange={(e) => handleChange(e, 'name')}
        />
        <ButtonContainer>
          <Button onClick={() => handleChange(2, 'multiplier')} >2</Button>
          <Button onClick={() => handleChange(1, 'multiplier')} >1</Button>
          <Button onClick={() => handleChange(1 / 2, 'multiplier')} >1/2</Button>
          <Button onClick={() => handleChange(1 / 4, 'multiplier')} >1/4</Button>
          <Button onClick={() => handleChange(1 / 8, 'multiplier')} >1/8</Button>
        </ButtonContainer>
      </Header>

      <ButtonContainer style={{ justifyContent: 'center' }}>
        <IconButton onClick={() => trackData && setPlay(!play)}>
          {(play)
            ? <PauseRoundedIcon />
            : <PlayArrowRoundedIcon />}
        </IconButton>
        <IconButton onClick={() => handleNewBlock()}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => handleBlockDelete()}>
          <RemoveIcon />
        </IconButton>
      </ButtonContainer>

      <DragDropContext
        onDragEnd={handleOnDragEnd}
      >
        <Droppable
          droppableId='track'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sequenceData.columnOrder.map((columnId, index) => {
                const column = sequenceData.columns[columnId];
                const tasks = column.taskIds.map(taskId => sequenceData.tasks[taskId])

                return <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>

        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} />
          <AccordionDetails>
            {/* <Library /> */}
          </AccordionDetails>
        </Accordion>

      </DragDropContext>
      <ButtonContainer style={{ justifyContent: 'center' }}>
        <Button onClick={() => handleSubmit()}>Save</Button>
      </ButtonContainer>
    </Root>
  );
}

export default Sequencer;
