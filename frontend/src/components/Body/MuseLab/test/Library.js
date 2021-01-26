// import React, { useState } from 'react';
// import styled from 'styled-components';

// import Task from './Task';
// import { initializeLibrary } from './test';
// import { Droppable, Draggable } from 'react-beautiful-dnd';

// const Root = styled.div`
//   display: flex;
//   justify-content: center;
// `

// const NoteList = styled.div`
//   display: flex;
//   flex-direction: row;
//   // align-items: center;
//   justify-content:

//   min-height: 15rem;
//   min-width: 9rem;
// `;

// const Library = (props) => {
//   const [noteLibrary, setNoteLibrary] = useState(initializeLibrary());
//   const currentLibrary = Object.keys(noteLibrary)[2]

//   console.log('Library structure: ', noteLibrary);

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

// export default Library;
