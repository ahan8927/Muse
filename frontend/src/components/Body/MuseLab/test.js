const multiplier = 2
const bpm = Math.floor(60000 / 60)

const playTrack = (track) => {
  console.log(track)
  let currentBlock = 0

  const blockStepSpeed = (bpm * multiplier)
  let trackSequencer = setInterval(playBlock, blockStepSpeed)

  function playBlock() {
    let currentNote = 0
    if (currentBlock < track.length - 1) {
      const noteSpeed = (blockStepSpeed / track[currentBlock].length);
      console.log(`\nCurrentBlock: ${currentBlock}, currentBlockSpeed: ${blockStepSpeed}, currentNoteSpeed: ${noteSpeed}`)
      let blockSequencer = setInterval(playNote, noteSpeed);

      function playNote() {
        if (currentNote <= track[currentBlock].length - 1) {
          console.log('currentNote: ', currentNote)
          currentNote += 1;
        } else {
          currentNote = 0;
          clearInterval(blockSequencer);
          currentBlock += 1;
        }
      }
    } else {
      clearInterval(trackSequencer);
      console.log('track finished!')
    }
  }
}

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

const loopTester = (arr) => {
  let i = 0;
  while (i < arr.length) {
    let j = 0
    while (j < arr[i].length) {
      console.log(`${i}_${j}`)
      j++
    }
    i++
  }
}

function getAllNestedElements(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(getAllNestedElements(arr[i]));
    }
    else {
      result.push(arr[i]);
    }
  }
  //console.log(result);
  return result;
}

getAllNestedElements(array)

playTrack(trackData)
// loopTester(trackData)


  // let seconds = 0
  // const timeTracker = setInterval(() => {
  //   console.log(`seconds: ${seconds}`);
  //   seconds += 1;
  // }, 1000)

  //TRY DOING recursion
