export const soundLibrary = {
  'keys': {
    'Keys_1': 'sounds/keys-guitars/keys/keys1.wav',
    'Keys_2': 'sounds/keys-guitars/keys/keys2.wav',
    'Keys_3': 'sounds/keys-guitars/keys/keys3.wav',
    'Keys_4': 'sounds/keys-guitars/keys/keys4.wav',
    'Keys_5': 'sounds/keys-guitars/keys/keys5.wav',
    'Keys_6': 'sounds/keys-guitars/keys/keys6.wav',
    'Keys_7': 'sounds/keys-guitars/keys/keys7.wav',
  },
  'guitars': {
    'Guitar_1': 'sounds/keys-guitars/guitar/guitar_palm-1',
    'Guitar_2': 'sounds/keys-guitars/guitar/guitar_palm-2',
    'Guitar_3': 'sounds/keys-guitars/guitar/guitar_palm-3',
    'Guitar_4': 'sounds/keys-guitars/guitar/guitar_palm-4',
    'Guitar_5': 'sounds/keys-guitars/guitar/guitar_palm-5',
  },
  'percussions': {
    'Hat': 'sounds/percussions/hat.mp3',
    'Claves': 'sounds/percussions/claves.mp3',
    'Triangle': 'sounds/percussions/triangle.mp3',
    'Shaker': 'sounds/percussions/shaker.mp3',
    'Crash': 'sounds/percussions/crash.mp3',
    'Conga': 'sounds/percussions/conga.mp3',
    'Conga_2': 'sounds/percussions/conga2.mp3',
    'Tom': 'sounds/percussions/tom.mp3',
    'Tom_2': 'sounds/percussions/tom2.mp3',
  },
  'snares': {
    'Snare': 'sounds/808-snares/snare.wav',
    'Snare_2': 'sounds/808-snares/snare2.wav',
    'Rim': 'sounds/808-snares/rim.wav',
    'Clap': 'sounds/808-snares/clap.wav',
    'Snap': 'sounds/808-snares/snap.wav',
  },
  '808': {
    'Kick': 'sounds/808-snares/kick.wav',
    'Kick_2': 'sounds/808-snares/kick2.wav',
    '808_1': 'sounds/808-snares/808s/8081wkick.wav',
    '808_2': 'sounds/808-snares/808s/8082wkick.wav',
    '808_3': 'sounds/808-snares/808s/8083wkick.wav',
    '808_4': 'sounds/808-snares/808s/8084wkick.wav',
    '808_5': 'sounds/808-snares/808s/8085wkick.wav',
  }
}

export const createTempSequence = () => {
  return [
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
    { //Button 2
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
      bpm: 60,
      multiplier: 1,
      color: '#293847',
    },
  ]
}

export default soundLibrary
