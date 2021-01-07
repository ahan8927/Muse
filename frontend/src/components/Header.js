import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import { AuthContext } from '../context/context';
import LoginForm from './Header/LoginForm';
import SignupForm from './Header/SignUpForm';
// import Settings from './Header/Settings';
// import Dashboard from './Header/Dashboard';
import Help from './Header/Help';

//Mui
import { makeStyles, Typography, IconButton, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

//Icons
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  navBar_root: {
    // maxWidth: '1000px',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateAreas: '\'left middle right\'',
    justifyContent: 'space-between',
    padding: '0.5rem',
    zIndex: '1000',
  },
  navBar_left: {
    display: 'flex',
    gridArea: 'left',
    maxWidth: '25rem',
  },
  navBar_middle: {
    // display: 'grid',
    display: 'flex',
    gridArea: 'middle',
  },
  navBar_right: {
    display: 'flex',
    alignItems: 'center',
    gridArea: 'right',
    // maxWidth: '25rem',
  },


  navBar_navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navBar_icon: {
    minWidth: '1.5rem',
    maxWidth: '3rem',
  },
  navBar_iconContainer: {
    display: 'grid',
    gridAutoColumns: 'column',
    // gap: '.5rem',
    maxWidth: 'fit-content',
    justifyContent: 'center',
  },
  navBar_iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    // cursor: 'pointer',
  },
  iconButton: {
    '&.MuiIconButton-root': {
      borderRadius: '.5rem',
      padding: '.5rem'
    }
  },
  dialog: {
    width: 'auto',
    height: 'auto',
  }
}));

const getParams = () => {
  return window.location.pathname.slice(1)
}

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const loadedUser = useSelector(state => state.session.user);
  const { authDialog, setAuthDialog } = useContext(AuthContext);

  const [user, setUser] = useState()
  const [whichDialog, setWhichDialog] = useState('');


  useEffect(() => {
    (JSON.stringify(loadedUser) === '{}') ? setUser(null) : setUser(loadedUser)
  }, [loadedUser])



  const navs = [
    {
      title: 'Dashboard',
      redirect: false,
      path: 'dashboard',
      icon: <DashboardIcon color='primary' />
    },
    {
      title: 'Help',
      redirect: false,
      path: 'help',
      icon: <HelpOutlineIcon color='primary' />
    }
  ]

  const handleClose = () => {
    setAuthDialog(false);
  }

  const handleNavClick = (path) => {
    history.push(path)
  }

  const handleMenuClick = (path) => {
    setWhichDialog(path)
    setAuthDialog(true)
  }

  const renderDialog = (dialog) => {
    switch (dialog) {
      case 'login':
        return <LoginForm whichDialog={whichDialog} setWhichDialog={setWhichDialog} />
      case 'signup':
        return <SignupForm />
      // case 'settings':
      //   return <Settings getParams={() => getParams()} user={user} setParams={(path) => setParams(path)} />;
      // case 'dashboard':
      //   return <Dashboard getParams={() => getParams()} setParams={(path) => setParams(path)} />
      case 'help':
        return <Help />
      default:
        return;
    }
  }

  return (
    <>
      <div className={classes.navBar_root}>

        {/* LEFT */}
        <div className={classes.navBar_left}>
          {/* TODO: history.push('/home') */}
          <Button >
            <Typography color='inherit' >Muse</Typography>
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={classes.navBar_middle}>
          <div className={classes.navBar_navContainer}>
            {navs.map((navItem) => (
              <IconButton
                className={classes.iconButton}
                key={navItem.title}
                title={navItem.title}
                onClick={() => handleMenuClick(navItem.path)}
              >
                {navItem.icon}
              </IconButton>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={classes.navBar_right}>
          <Button
            className={classes.iconButton}
            title={(user) ? 'Profile' : 'Login'}
            endIcon={<SettingsIcon color='inherit' />}
            onClick={() => (user ? handleNavClick('/profile') : handleMenuClick('login'))}
          >
            <Typography color='primary'>
              {(user) ? `${user.username}` : 'Login'}
            </Typography>
          </Button>
          {/* </div> */}
        </div>
      </div >
      <Dialog open={authDialog} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
        {renderDialog(whichDialog)}
      </Dialog>
    </>
  );
}

export default Header;
