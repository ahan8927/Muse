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
    'note-1': { id: 'note-1', name: 'Keys_1', library: 'Keys' },
    'note-2': { id: 'note-2', name: 'Keys_2', library: 'Keys' },
    'note-3': { id: 'note-3', name: 'Keys_3', library: 'Keys' },
    'note-4': { id: 'note-4', name: 'Keys_4', library: 'Keys' },
  },
  columns: {
    'block-1': {
      id: 'block-1',
      title: 'block-1',
      taskIds: ['note-1'],
    },
    'block-2': {
      id: 'block-2',
      title: 'block-2',
      taskIds: ['note-2'],
    },
    'block-3': {
      id: 'block-3',
      title: 'block-3',
      taskIds: ['note-3'],
    },
    'block-4': {
      id: 'block-4',
      title: 'block-4',
      taskIds: ['note-4'],
    },
  },
  //facilitate reordering
  columnOrder: ['block-1', 'block-2', 'block-3', 'block-4'],
}
