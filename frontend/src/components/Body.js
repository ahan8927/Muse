import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//Components
import Splash from './Body/Splash';
import MusicLab from './Body/MuseLab/MusicLab';

//MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (user)
          ? (<Component user={user} {...rest} />)
          : (<Redirect to='/login' />)
      }}
    />
  )
};

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fffffc',
    padding: '1rem',
  },
  section: {

  }
}))

const Body = (props) => {
  const classes = useStyles()

  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(props.user)
    setIsLoaded(true)
  }, [props.user])

  return isLoaded && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper className={classes.paper} elevation={0}>
        <Switch>
          <Route exact path='/' render={props => <Splash {...props} />} />
          {/* <Route exact path='/login' render={props => <LoginForm {...props} />} /> */}
          {/* <Route exact path='/signup' render={props => <SignUpForm {...props} />} /> */}
          <Route exact path='/muse-board' render={props => <MusicLab {...props} />} />
          <Route path='*' render={props => <MusicLab {...props} />} />
          {/* <ProtectedRoute exact user={user} path="/search" component={SavedMaps} /> */}
        </Switch>
      </Paper>
    </div>
  )
}

export default Body
