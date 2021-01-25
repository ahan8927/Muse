import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

//Components
import soundLibrary from './SoundLibrary';
import * as soundTools from './SoundTools';
import initialData from './test/test';
import Column from './test/Column';

//MUI
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
 display: flex;
`

const Root = styled.div`
background: #212121;
`

const Sequencer = (props) => {

  const [sequenceName, setSequenceName] = useState('');
  const [sequenceData, setSequenceData] = useState(initialData)

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

  return (
    <Root>
      <TextField onChange={handleChange('name')} />
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
      </DragDropContext>
    </Root>
  );
}

export default Sequencer;
