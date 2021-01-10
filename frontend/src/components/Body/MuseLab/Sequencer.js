import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

//Components
import DynamicCheckboxes from './DynamicSequenceRows';
// import StaticCheckboxes from './StaticSequenceRows'

//MUI

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {

  },
  row: {

  }
}))


const Sequencer = () => {
  const classes = useStyles();

  return (
    <>
      <DynamicCheckboxes rows={8} cols={8} />
    </>
  );
}

export default Sequencer;
