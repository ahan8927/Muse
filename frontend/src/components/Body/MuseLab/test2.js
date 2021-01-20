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

//   (function playBlock(i) {
//     setTimeout(function () {
//       console.log(`\nCurrentBlock: ${i}`)
//       const noteSpeed = Math.floor(blockStepSpeed / track[i].length);

//       (function playNote(j) {
//         setTimeout(function () {

//           console.log('currentNote: ', j)

//           if (++j < track[i].length) playNote(j);
//         }, noteSpeed)
//       })(0);

//       if (++i < trackData.length) playBlock(i);
//     }, blockStepSpeed)
//   })(0);
// }

const playTrack = (track, actualbpm = 60, multiplier = 1) => {

  const bpm = (60000 / actualbpm);
  const blockStepSpeed = bpm * multiplier;

  (function playBlock(i) {
    setTimeout(function () {
      // console.log(`\nCurrentBlock: ${i}`)
      const noteSpeed = Math.floor(blockStepSpeed / track[i].length);

      (function playNote(j) {
        setTimeout(function () {

          console.log('currentBlock: ', i, ' currentNote: ', j)

          if (++j < track[i].length) playNote(j);
        }, noteSpeed)
      })(0);

      if (++i < trackData.length) playBlock(i);
    }, blockStepSpeed)
  })(0);
}

playTrack(trackData, 60, 1)
