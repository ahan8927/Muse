const Tone = require('tone')

const buffer = new Tone.ToneAudioBuffer("https://tonejs.github.io/audio/casio/A1.mp3", () => {
  console.log("loaded");
});
