import React from 'react';

//MUI 
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1rem',
    border: 'solid',
    cursor: 'pointer',
  }
}))

const NoteCard = (props) => {
  const classes = useStyles();

  const dragStart = e => {
    const target = e.target;

    e.dataTransfer.setData('card_id', target.id);

    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
  }

  const dragOver = e => {
    // e.stopPropogation();
  }

  return (
    <div
      id={props.id}
      className={props.className}
      draggable='true'
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

export default NoteCard;
