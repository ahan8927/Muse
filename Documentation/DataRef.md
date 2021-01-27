# Data Structure Ref

```js
const playerState = [
{ //Button 1
  sequenceTitle: 'Drum Sequence',
  track: [
    [ //Block
      { //Keys
        library: '808',
        name: 'Kick',
      },
      {
        library: 'percussions',
        name: 'Hat',
      },
      {
        library: 'snares',
        name: 'Snare',
      },
      {
        library: '808',
        name: 'Kick',
      },
    ],
    [ //Block2
      {
        library: 'percussions',
        name: 'Hat',
      },
      {
        library: '808',
        name: 'Kick',
      },
      {
        library: 'snares',
        name: 'Snare',
      },
      {
        library: 'percussions',
        name: 'Hat',
      },
    ],
  ],
  bpm: 60000 / 60,
  multiplier: 1,
  color: '#293847',
},
]


const sequencerState = {
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

```
