# Data Structure Ref

```js
const sequenceState = [
  { //Button 1
    sequenceTitle: 'Sequence 1',
    track: [
        [ //Block
            { //Keys
              name: 'sound1',
              sound: buffer[library]['sound1']
            },
            {
              name: 'sound2',
              sound: buffer[library]['sound2']
            },
        ],
        [ //Block2
            { //Keys
              name: 'sound3',
              sound: buffer[library]['sound1']
            },
            {
              name: 'sound4',
              sound: buffer[library]['sound2']
            },
            {
              name: 'sound1',
              sound: buffer[library]['sound2']
            },
            {
              name: 'sound2',
              sound: buffer[library]['sound2']
            },
        ],
    ],
    bpm: 60,
    multiplier: 1,
    color: '#293847',
  },
