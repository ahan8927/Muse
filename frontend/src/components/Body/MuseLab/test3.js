const trackData = [
  [
    'block-0_note-0',
    'block-0_note-1',
    'block-0_note-2',
    'block-0_note-3',
  ],
  [
    'block-1_note-0',
    'block-1_note-1',
    'block-1_note-2',
  ],
  [
    'block-2_note-0',
    'block-2_note-1',
  ],
  [
    'block-3_note-0',
  ],
  [
  ],
]

const bpm = 60000 / 60;
const multiplier = 1

function playTrack(track) {
  console.log('Start!!, track length: ', track.length, '\n')
  let currentBlock = 0;

  (function playBlock() {
    console.log('\ncurrentBlock: ', currentBlock)
    // play note

    let currentNote = 0
    const noteSpeed = track[currentBlock].length ? ((bpm * multiplier) / track[currentBlock].length) : (bpm * multiplier)
    if (currentBlock <= track.length - 1) {
      playNote()
    } else {
      console.log('loop done');
      return;
    }

    function playNote() {
      // console.log('currentBlock: ', currentBlock, ' currentNote: ', currentNote, ' currentSpeed: ', noteSpeed)
      // play note

      currentNote++
      if (currentNote < track[currentBlock].length) {
        setTimeout(playNote, noteSpeed);
      } else {
        currentBlock++
        if (currentBlock < track.length) {
          // console.log(currentBlock, '+= 1\n');
          setTimeout(playBlock, noteSpeed);
        } else {
          setTimeout(() => playTrack(track), noteSpeed);
        }
      }
    }
  })()

}

playTrack(trackData)
