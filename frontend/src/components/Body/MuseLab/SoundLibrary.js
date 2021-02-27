import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import Task from './Task';

export const soundLibrary = {
  'Chords': {
    'Chords_1': 'sounds/keys-guitars/keys/keys1.wav',
    'Chords_2': 'sounds/keys-guitars/keys/keys2.wav',
    'Chords_3': 'sounds/keys-guitars/keys/keys3.wav',
    'Chords_4': 'sounds/keys-guitars/keys/keys4.wav',
    'Chords_5': 'sounds/keys-guitars/keys/keys5.wav',
    'Chords_6': 'sounds/keys-guitars/keys/keys6.wav',
    'Chords_7': 'sounds/keys-guitars/keys/keys7.wav',
  },
  'Guitars': {
    'Guitar_1': 'sounds/keys-guitars/guitar/guitar_palm-1',
    'Guitar_2': 'sounds/keys-guitars/guitar/guitar_palm-2',
    'Guitar_3': 'sounds/keys-guitars/guitar/guitar_palm-3',
    'Guitar_4': 'sounds/keys-guitars/guitar/guitar_palm-4',
    'Guitar_5': 'sounds/keys-guitars/guitar/guitar_palm-5',
  },
  'Percussions': {
    'Hat_1': 'sounds/percussions/hat.mp3',
    'Claves_1': 'sounds/percussions/claves.mp3',
    'Triangle_1': 'sounds/percussions/triangle.mp3',
    'Shaker_1': 'sounds/percussions/shaker.mp3',
    'Crash_1': 'sounds/percussions/crash.mp3',
    'Conga_1': 'sounds/percussions/conga.mp3',
    'Conga_2': 'sounds/percussions/conga2.mp3',
    'Tom_1': 'sounds/percussions/tom.mp3',
    'Tom_2': 'sounds/percussions/tom2.mp3',
  },
  'Snares': {
    'Snare_1': 'sounds/808-snares/snare.wav',
    'Snare_2': 'sounds/808-snares/snare2.wav',
    'Rim_1': 'sounds/808-snares/rim.wav',
    'Clap_1': 'sounds/808-snares/clap.wav',
    'Snap_1': 'sounds/808-snares/snap.wav',
  },
  '808': {
    'Kick_1': 'sounds/808-snares/kick.wav',
    'Kick_2': 'sounds/808-snares/kick2.wav',
    '808_1': 'sounds/808-snares/808s/8081wkick.wav',
    '808_2': 'sounds/808-snares/808s/8082wkick.wav',
    '808_3': 'sounds/808-snares/808s/8083wkick.wav',
    '808_4': 'sounds/808-snares/808s/8084wkick.wav',
    '808_5': 'sounds/808-snares/808s/8085wkick.wav',
  },
  'Misc': {
    'Rest_1': 'sounds/rest.wav',
  },
}

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 1rem;
  border-radius: .5rem;  
  width: 45rem;

  background: #212121;
  box-shadow: inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e;
`;

const ColumnContainer = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 10rem;
`;

const Column = (props) => {
  return (
    <TaskContainer>
      <Droppable droppableId={props.column.id} type='notes' direction='horizontal'>
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


export const initializeSequencerLibrary = () => {
  const columns = {}
  const allTasks = {}

  Object.keys(soundLibrary).map((library, i) => {
    const tasks = {}

    Object.keys(soundLibrary[library]).map((note, j) => {
      const newId = `${library}-${note}`
      tasks[newId] = {
        id: newId,
        name: note,
        library: library
      }
      allTasks[newId] = {
        id: newId,
        name: note,
        library: library,
      }
    })

    columns[library] = {
      id: library,
      title: library,
      taskIds: Object.keys(tasks)
    }
  });

  const columnOrder = Object.keys(columns);
  const noteLibrary = {
    tasks: allTasks,
    columns: columns,
    columnOrder: columnOrder,
  }

  return noteLibrary
}

export const SequencerLibrary = () => {
  const [noteLibrary, setNoteLibrary] = useState(initializeSequencerLibrary());

  const slides = [
    { title: 'First Library', description: 'Lorem ipsum' },
    { title: 'Second Library', description: 'Lorem ipsum' },
  ];

  return (
    <Slider>
      {noteLibrary.columnOrder.map((columnId, index) => {
        const column = noteLibrary.columns[columnId];
        const tasks = column.taskIds.map(taskId => noteLibrary.tasks[taskId])

        return (
          <ColumnContainer key={column.id}>
            <div style={{ color: '#AFB1D4' }}>{columnId}</div>
            <Column
              column={column}
              tasks={tasks}
              index={index}
            />
          </ColumnContainer>
        )
      })}
    </Slider>
  );
}
