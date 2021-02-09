# Data Structure Ref

```js
const buttonState = {
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

const boardState = {
  bpm: 1000, //ms
  projectName: 'First Project!',
  sequences: {
    0: {
      sequenceTitle: 'Bass Sound',
      color: 'AFB1D4',
      multiplier: 1,
      sequenceData: {
        columnOrder: ['block-1', 'block-2', 'block-3', 'block-4'],
        columns: {
          'block-1': {
            id: 'block-1',
            title: 'block-1',
            taskIds: ['808_808_5-1', 'misc_Rest_1-5', 'misc_Rest_1-4', '808_808_1-2'],
          },
          'block-2': {
            id: 'block-2',
            title: 'block-2',
            taskIds: ['808_808_1-3'],
          },
          'block-3': {
            id: 'block-3',
            title: 'block-3',
            taskIds: [],
          },
          'block-4': {
            id: 'block-4',
            title: 'block-4',
            taskIds: [],
          },
        },
        tasks: {
          '808_808_5-1': {
            id: '808_808_5-1',
            name: '808_5', 
            library: '808',
          }
        },        
      },
    },
    1: {
      sequenceTitle: 'Snare', 
      multiplier: 1, 
      color: '#AFB1D4',
      sequenceData: {
        columnOrder: ['block-1', 'block-2'],
        columns: {
          'block-1' :{
            id: 'block-1',
            title: 'block-1',
            taskIds: ['Snares_Snare_2-1'],
          },
          'block-2': {
            id: 'block-2',
            title: 'block-2',
            taskIds: []
          }
        }
        tasks: {
          'Snares_Snare_2-1': {
            id: 'Snares_Snare_2-1',
            name: 'Snare_2',
            library: 'Snares',
          }
        }
      }, 
    },
    2: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    3: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    4: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    5: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    6: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    7: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    8: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    9: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    10: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    11: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    12: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    13: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    14: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
    15: {sequenceTitle: '', sequenceData: null, multiplier: 1, color: '#AFB1D4',},
  }
}

```
