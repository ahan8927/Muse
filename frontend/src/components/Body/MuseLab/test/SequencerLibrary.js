import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import { initializeSequencerLibrary } from '../SoundLibrary';
import Task from './Task';
import { initialData } from './test'

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 1rem;
  border-radius: .5rem;
  min-height: 8rem;

  background: #131313;
  box-shadow: inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e;
`;

const ColumnContainer = styled.div`
 display: flex;
 width: fit-content;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  min-height: 10rem;
  min-width: 5rem;
`;

const Column = (props) => {
  return (
    <TaskContainer>
      <Droppable droppableId={props.column.id} type='library' direction='horizontal'>
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
    </TaskContainer>
  );
}


const SequencerLibrary = () => {
  // const [noteLibrary, setNoteLibrary] = useState(initializeSequencerLibrary());
  const [noteLibrary, setNoteLibrary] = useState(initialData);

  const slides = [
    { title: 'First Library', description: 'Lorem ipsum' },
    { title: 'Second Library', description: 'Lorem ipsum' },
  ];

  console.log(noteLibrary)
  return (
    // <>
    //   <Slider
    //     infinte={true}
    //   >
    //     {slides.map((slide, index) => <div key={index}>
    //       <ColumnContainer>
    //         {noteLibrary.columnOrder.map((columnId, index) => {
    //           const column = noteLibrary.columns[columnId];
    //           const tasks = column.taskIds.map(taskId => noteLibrary.tasks[taskId])

    //           return <Column
    //             key={column.id}
    //             column={column}
    //             tasks={tasks}
    //             index={index}
    //           />;
    //         })}
    //       </ColumnContainer>
    //     </div>)}
    //   </Slider>
    // </>
    <Slider>
      {noteLibrary.columnOrder.map((columnId, index) => {
        const column = noteLibrary.columns[columnId];
        const tasks = column.taskIds.map(taskId => noteLibrary.tasks[taskId])

        return (
          <ColumnContainer>
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              index={index}
            />;
          </ColumnContainer>
        )
      })}
    </Slider>
  );
}

export default SequencerLibrary;
