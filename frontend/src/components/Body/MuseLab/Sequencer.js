import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

//Components
import soundLibrary from './SoundLibrary';
import { initialData } from './test/test';
import Column from './test/Column';
import * as soundTools from './SoundTools';
import SequencerLibrary from './test/SequencerLibrary';

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

  const currentSequence = props.sequenceState.sequences[props.index];
  const [sequenceName, setSequenceName] = useState(props.index ? currentSequence.sequenceTitle : '');
  // const [sequenceData, setSequenceData] = useState(props.index ? currentSequence.sequenceData : initialData);
  const [sequenceData, setSequenceData] = useState(initialData);
  const [multiplier, setMultiplier] = useState(props.index ? currentSequence.multiplier : 1);
  const [bpm] = useState(props.sequenceState.bpm ? props.sequenceState.bpm : 1000);

  const [play, setPlay] = useState(false)
  const [buffer, setBuffer] = useState({})
  const [delay, setDelay] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeBuffer = () => {
    const placeHolder = {}
    if (sequenceData) {
      Object.values(sequenceData.columns).forEach(blockData => {
        blockData.taskIds.forEach(noteId => {
          const { name, library } = sequenceData.tasks[noteId]
          placeHolder[name] = soundLibrary[library][name] //file path
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => setBuffer(bufferDict))
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
    setSequenceData(newState);
  }

  const handleBlockDelete = () => {
    const idToDelete = sequenceData.columnOrder[sequenceData.columnOrder.length - 1]
    const newState = sequenceData;
    newState.columnOrder.pop()
    delete newState.columns[idToDelete]

    setSequenceData(newState);
  }

  const handleSubmit = () => {
    const newBeatPadState = props.sequenceState;
    newBeatPadState.sequences[props.index].sequenceData = sequenceData
    newBeatPadState.sequences[props.index].multiplier = multiplier
    newBeatPadState.sequences[props.index].sequenceTitle = sequenceName

    props.setSequenceState(newBeatPadState)
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

      setSequenceData(newState);
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

      setSequenceData(newState);
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
    setSequenceData(newState);
    return;
  }

  function playTrack() {
    let currentBlock = 0;

    (function playBlock() {
      let currentNote = 0
      const currentBlockData = sequenceData.columns[sequenceData.columnOrder[currentBlock]]

      let noteSpeed = 0
      if (currentBlockData.taskIds.length > 0) {
        noteSpeed = (bpm * multiplier) / currentBlockData.taskIds.length
        playNote()
      } else {
        noteSpeed = bpm * multiplier
        currentBlock++
        if (currentBlock < sequenceData.columnOrder.length) {
          setDelay(setTimeout(playBlock, noteSpeed))
        } else {
          setDelay(setTimeout(() => playTrack(), noteSpeed))
        }
      }

      function playNote() {
        const { name } = sequenceData.tasks[currentBlockData.taskIds[currentNote]]

        const currentSound = new Tone.Player(buffer.get(name).get()).toDestination()
        currentSound.start()

        currentNote++;
        if (currentNote < currentBlockData.taskIds.length) {
          setDelay(setTimeout(playNote, noteSpeed));
        } else {
          currentBlock++
          if (currentBlock < sequenceData.columnOrder.length) {
            setDelay(setTimeout(playBlock, noteSpeed))
          } else {
            setDelay(setTimeout(() => playTrack(), noteSpeed))
          }
        }
      }
    })()
  }













  useEffect(() => {
    initializeBuffer()
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (sequenceData) {
      if (play) {
        playTrack()
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
        <IconButton onClick={() => sequenceData && setPlay(!play)}>
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
            <SequencerLibrary />
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
