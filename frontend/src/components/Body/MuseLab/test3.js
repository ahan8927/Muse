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
]

// const playTrack = (track, actualbpm = 60, multiplier = 1) => {

//   const bpm = (60000 / actualbpm);
//   const blockStepSpeed = bpm * multiplier;

//   let currentBlock = 0;

//   (function playNote(currentNote) {
//     const noteSpeed = Math.floor(blockStepSpeed / track[currentBlock].length);

//     console.log('currentBlock: ', currentBlock, 'currentNote: ', currentNote);

//     setTimeout(function () {
//       if (++currentNote < track[currentBlock].length) {
//         playNote(currentNote)
//       }
//     }, noteSpeed)
//   })(0)

// }

// playTrack(trackData, 60, 1)

const bpm = 60000 / 60;
const multiplier = 2

function playTrack(track) {
  console.log('Start!!, track length: ', track.length)
  let currentBlock = 0;

  (function playBlock() {
    let currentNote = 0
    const noteSpeed = ((bpm * multiplier) / track[currentBlock].length)
    if (currentBlock <= track.length - 1) {
      playNote()
    } else {
      console.log('loop done');
      return;
    }

    function playNote() {
      console.log('currentBlock: ', currentBlock, ' currentNote: ', currentNote, ' currentSpeed: ', noteSpeed)
      if (currentNote++ < track[currentBlock].length - 1) {
        setTimeout(playNote, noteSpeed);
      } else {
        if (currentBlock++ < track.length - 1) {
          console.log(currentBlock, '+= 1');
          setTimeout(playBlock, noteSpeed);
        } else {
          currentBlock = 0;
          setTimeout(playBlock, noteSpeed);
        }
      }
    }
  })()

}

playTrack(trackData)
