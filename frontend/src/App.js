import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import * as sessionActions from './store/actions/session';

//Component Imports
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
// import CustomCursor from './components/Body/CustomCursor/cursor'
import { AuthContext } from './context/context';

//MUI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1000px',
    display: 'grid',
    gridAutoFlow: 'row',
    alignItems: 'center',
    minHeight: '96vh',
    padding: '2rem',
    gap: '2rem',
    width: '100%',
    gridTemplateRows: 'auto 1fr auto',
  },
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw'
  },
  spotlight: {
    position: 'absolute',
    margin: '0',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    backgroundImage: 'radial-gradient(circle, transparent 100px, rgba(0, 0, 0, 0.85) 160px'
  }
}))



const App = (props) => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false)

  // const spotlightSize = 'transparent 1000px, rgba*0, 0, 0, 0.85) 160px)'
  // window.addEventListener('mousemove', e => {
  //   isLoaded && requestAnimationFrame(() => updateSpotlight(e))
  // })

  // const updateSpotlight = e => {

  //   const spotlight = document.getElementById('spotlight')
  //   const xPos = e.pageX / window.innerWidth * 100;
  //   const yPos = e.pageY / window.innerHeight * 100;
  //   console.log(xPos, yPos)
  //   spotlight.style.backgroundImage = `radial-gradient(circle at ${xPos}% ${yPos}, ${spotlightSize})`
  // }

  // console.log(spotlight)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      <div className={classes.root}>
        <BrowserRouter>
          <Header user={props.user} />
          <Body user={props.user} />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

const AppContainer = (props) => {
  const dispatch = useDispatch();
  // const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [authDialog, setAuthDialog] = useState(false);
  const [user, setUser] = useState({})


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(data => setUser(data))
    setIsLoaded(true)
  }, [dispatch]);

  return isLoaded && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AuthContext.Provider value={{ authDialog, setAuthDialog }}>
        {/* <div id='spotlight' className={classes.spotlight} /> */}
        <App user={user} />
      </AuthContext.Provider>
    </div>
  )
}

export default AppContainer;
