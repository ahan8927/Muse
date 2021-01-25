import React, { useState } from 'react';
import styled from 'styled-components'

import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  width: 5rem;
  margin: 1rem 0;
  border-radius: .25rem;
  padding: 1rem;

  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`

const Task = (props) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.name}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
