# more suedo code

```js

const playTrack = (track) => {
  let currentBlock = 0

  const blockStepSpeed = (bpm * multiplier)
  const trackSequencer = setInterval(playBlock(track), blockStepSpeed)

  function playBlock(track){
    let currentNote = 0

    const noteSpeed = (blockStepSpeed / currentBlock.length);
    const blockSequencer = setInterval(playNote(), noteSpeed);

    function playNote(currentBlock){
      if(currentNote === currentBlock.length){
        clearInterval(blockSequencer);
      } else {
        // const currentNote = currentBlock[subNote]
        // currentNote.start()
        const note = track[currentBlock][currentNote];
        note.start();
        currentNote++;
      }
    }
    currentBlock++;
  }

}

```
