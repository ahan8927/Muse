import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 1rem;
  border-radius: .5rem;
  min-height: 10rem;
  width: 10rem;

  background: #212121;
  box-shadow: inset 9px 9px 18px #131313, inset -9px -9px 18px #2f2f2f;
`;

const Title = styled.h3`
  padding: 8px;
  min-height: 1rem;
  color: #f0efeb;
`;

const TaskList = styled.div`
  min-height: 10rem;
  
  padding: 1rem;
  margin: 1rem;
`;

const Column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={props.column.id} type='notes'>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column;
