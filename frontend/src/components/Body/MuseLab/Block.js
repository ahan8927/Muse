import React from 'react';

//MUI 
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    width: '4rem',
    minHeight: '4rem',
    padding: '15px',

    border: 'solid',
  },
}))

const Block = (props) => {
  const classes = useStyles()

  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = 'block';

    e.target.appendChild(card);
  }

  const dragOver = e => {
    e.preventDefault();
  }

  return (
    <div
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      className={classes.root}
    >
      {props.children}
    </div>
  );
}

export default Block;
