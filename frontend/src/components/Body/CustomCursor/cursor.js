import React, { useRef, useEffect } from 'react';

//MUI
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  custom: {
    zIndex: '1',
    // borderRadius: '50%',
    width: '200%',
    height: '200%',
    // border: '1px solid white',
    backgroundImage: 'radial-gradient(circle, transparent, #000 35%)',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    position: 'fixed',
  }
}))

const CustomCursor = () => {
  const classes = useStyles()

  const cursorRef = useRef(null)
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
  })

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      const { clientX, clientY } = e;
      const mouseX = clientX - cursorRef.current.clientWidth / 4;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    })
  }, [])

  return (
    <div className={classes.custom} ref={cursorRef} />
  );
}

export default CustomCursor;
