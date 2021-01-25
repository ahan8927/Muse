import React, { useState } from 'react';
import styled from 'styled-components'

import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  width: 5rem;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: .25rem;

  text-align: center;
  background: linear-gradient(145deg, #232323, #1e1e1e);
  box-shadow:  9px 9px 18px #131313, -9px -9px 18px #2f2f2f;

  color: white;
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
