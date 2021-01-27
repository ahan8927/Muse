import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import { initializeSequencerLibrary } from '../SoundLibrary';
import Task from './Task';

const Root = styled.div`
  display: flex;
  justify-content: center;
`

const NoteList = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content:

  min-height: 15rem;
  min-width: 9rem;
`;

// const Library = (props) => {
//   // const currentLibrary = Object.keys(noteLibrary)[2]

//   return (
//     <Root>
//       <Droppable droppableId={currentLibrary} type='notes'>
//         {(provided, snapshot) => (
//           <NoteList
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             isDraggingOver={snapshot.isDraggingOver}
//           >
//             {Object.keys(noteLibrary[currentLibrary].notes).map((note, index) => (
//               <Task key={note.id} task={note} index={index} />
//             ))}
//             {provided.placeholder}
//           </NoteList>
//         )}
//       </Droppable>
//     </Root>
//   );
// }


const SequencerLibrary = () => {
  const [noteLibrary, setNoteLibrary] = useState(initializeSequencerLibrary());

  const slides = [
    { title: 'First Library', description: 'Lorem ipsum' },
    { title: 'Second Library', description: 'Lorem ipsum' },
  ];


  return (
    <>
      <Slider
        infinte={true}
      >
        {slides.map((slide, index) => <div key={index}>
          <h2>{slide.title}</h2>
          <div>{slide.description}</div>
        </div>)}
      </Slider>
    </>
  );
}

export default SequencerLibrary;
