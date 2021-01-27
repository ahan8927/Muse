import soundLibrary from '../SoundLibrary';

export const initialData = {
  tasks: {
    'note-100': { id: 'note-100', name: 'Keys_1', library: 'Keys' },
    'note-102': { id: 'note-102', name: 'Keys_2', library: 'Keys' },
    'note-102': { id: 'note-102', name: 'Keys_3', library: 'Keys' },
    'note-103': { id: 'note-103', name: 'Keys_4', library: 'Keys' },
  },
  columns: {
    'block-1': {
      id: 'block-1',
      title: 'block-1',
      taskIds: ['note-102'],
    },
    'block-2': {
      id: 'block-2',
      title: 'block-2',
      taskIds: ['note-102'],
    },
    'block-3': {
      id: 'block-3',
      title: 'block-3',
      taskIds: ['note-102'],
    },
    'block-4': {
      id: 'block-4',
      title: 'block-4',
      taskIds: ['note-103'],
    },
  },
  //facilitate reordering
  columnOrder: ['block-1', 'block-2', 'block-3', 'block-4'],
}
