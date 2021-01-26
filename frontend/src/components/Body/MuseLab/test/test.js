import soundLibrary from '../SoundLibrary';

export const initializeLibrary = () => {
  const noteLibrary = {}

  Object.keys(soundLibrary).map((library, i) => {
    const notes = {}
    Object.keys(soundLibrary[library]).map((note, j) => {
      notes[note] = {
        id: `${library}_${note}`,
        name: note,
        path: soundLibrary[library][note],
      }
    })
    noteLibrary[library] = {
      notes: notes
    }
  });

  return noteLibrary
}


export const initialData = {
  tasks: {
    'note-1': { id: 'note-1', name: 'Keys_1', library: 'keys' },
    'note-2': { id: 'note-2', name: 'Keys_2', library: 'keys' },
    'note-3': { id: 'note-3', name: 'Keys_3', library: 'keys' },
    'note-4': { id: 'note-4', name: 'Keys_4', library: 'keys' },
  },
  columns: {
    'block-1': {
      id: 'block-1',
      title: 'block-1',
      taskIds: ['note-1', 'note-2', 'note-3', 'note-4'],
    },
    'block-2': {
      id: 'block-2',
      title: 'block-2',
      taskIds: [],
    },
    'block-3': {
      id: 'block-3',
      title: 'block-3',
      taskIds: [],
    },
  },
  //facilitate reordering
  columnOrder: ['block-1', 'block-2', 'block-3'],
}
// export default initialData;

// const initialLibrary = {
//   //LIBRARYYYYYYYY
//   'Keys': {
//     notes: {
//       'keys-1': { id: 'keys-1', name: 'Keys_1', },
//       'keys-2': { id: 'keys-2', name: 'Keys_2', },
//       'keys-3': { id: 'keys-3', name: 'Keys_3', },
//       'keys-4': { id: 'keys-4', name: 'Keys_4', },
//       'keys-5': { id: 'keys-5', name: 'Keys_5', },
//       'keys-6': { id: 'keys-6', name: 'Keys_6', },
//       'keys-7': { id: 'keys-7', name: 'Keys_7', },
//     },
//     row: {
//       'guitar_row-1': {
//         id: 'keys_row-1',
//         noteIds: ['keys-1', 'keys-2', 'keys-3', 'keys-4']
//       },
//       'keys_row-2': {
//         id: 'keys_row-2',
//         noteIds: ['keys-5', 'keys-6', 'keys-7']
//       },
//     },
//     rowOrder: ['keys_row-1', 'keys_row-2'],
//   },

//   //LIBRARYYYYYYYY
//   'Guitars': {
//     notes: {
//       'guitar-1': { id: 'guitar-1', name: 'Guitar_1', },
//       'guitar-2': { id: 'guitar-2', name: 'Guitar_2', },
//       'guitar-3': { id: 'guitar-3', name: 'Guitar_3', },
//       'guitar-4': { id: 'guitar-4', name: 'Guitar_4', },
//       'guitar-5': { id: 'guitar-5', name: 'Guitar_5', },
//     },
//     row: {
//       'guitar_row-1': {
//         id: 'guitar_row-1',
//         noteIds: ['guitar-1', 'guitar-2', 'guitar-3']
//       },
//       'guitar_row-2': {
//         id: 'guitar_row-2',
//         noteIds: ['guitar-4', 'guitar-5']
//       },
//     },
//     rowOrder: ['guitar_row-1', 'guitar_row-2'],
//   },

//   //LIBRARYYYYYYYY
//   'Percussions': {
//     notes: {
//       'guitar-1': { id: 'guitar-1', name: 'Guitar_1', },
//     },
//     row: {
//       'guitar_row-1': {
//         id: 'guitar_row-1',
//         noteIds: []
//       },
//       'guitar_row-2': {
//         id: 'guitar_row-2',
//         noteIds: []
//       },
//     },
//     rowOrder: ['guitar_row-1', 'guitar_row-2'],
//   },

//   //LIBRARYYYYYYYY
//   'Snares': {
//     notes: {
//       'guitar-1': { id: 'guitar-1', name: 'Guitar_1', },
//     },
//     row: {
//       'guitar_row-1': {
//         id: 'guitar_row-1',
//         noteIds: []
//       },
//       'guitar_row-2': {
//         id: 'guitar_row-2',
//         noteIds: []
//       },
//     },
//     rowOrder: ['guitar_row-1', 'guitar_row-2'],
//   },

//   //LIBRARYYYYYYYY
//   '808': {
//     notes: {
//       'guitar-1': { id: 'guitar-1', name: 'Guitar_1', },
//     },
//     row: {
//       'guitar_row-1': {
//         id: 'guitar_row-1',
//         noteIds: []
//       },
//       'guitar_row-2': {
//         id: 'guitar_row-2',
//         noteIds: []
//       },
//     },
//     rowOrder: ['guitar_row-1', 'guitar_row-2'],
//   },
// }
