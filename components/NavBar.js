import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    color: 'white',
  },
  icon: {
    marginLeft: '7px',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
};

const NavBar = ({ classes, isLoggedIn }) => (
  <AppBar>
    <Toolbar className={classes.toolbar} variant="dense">
      <Button
        className={classes.button}
        href={isLoggedIn ? '/logout' : '/auth/twitter'}
      >
        {isLoggedIn ? 'logout' : 'login'}
        <i className={`fab fa-twitter ${classes.icon}`} />
      </Button>
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    icon: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(NavBar);
