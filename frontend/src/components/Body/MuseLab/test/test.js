import soundLibrary from '../SoundLibrary';

const sequences = [
  {

  }
]

const setInitialDemoState = () => {
  const initialState = {}
  initialState['sequences'] = {}
  for (let i = 0; i < 16; i++) {
    const state = {
      sequenceTitle: '',
      sequenceData: null,
      multiplier: 1,
      // color: '#293847',
      color: '#AFB1D4',
    }

    initialState['sequences'][i] = state
  }
  initialState['projectName'] = ''
  initialState['bpm'] = 857
  return initialState
}

export default setInitialDemoState
