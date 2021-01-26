import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

//Components
import soundLibrary from './SoundLibrary';
import * as soundTools from './SoundTools';
import { initialData } from './test/test';
import Column from './test/Column';
import Library from './test/Library';

//MUI
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  justify-content: center;
`

const InputContainer = styled.div`
  padding: 0 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: 'space-betwee',
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
  const [sequenceData, setSequenceData] = useState(initialData)
  const [multipler, setMultiplier] = useState(1)

  const [isLoaded, setIsLoaded] = useState(false)

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

  const handleSubmit = (e) => {
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
      console.log(newState)

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

  useEffect(() => {
    setIsLoaded(true, console.log(sequenceData))
  }, [])

  return isLoaded && (
    <Root>
      <Header>
        <TextField
          InputProps={{
            style: {
              width: '10rem',
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
                console.log(columnId, index)
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
    </Root>
  );
}

export default Sequencer;
