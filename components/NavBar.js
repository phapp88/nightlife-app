import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
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

const NavBar = ({ classes, isLoggedIn, state }) => {
  const handleClick = () => {
    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch (err) {
      console.log(err);
    }
    const route = isLoggedIn ? '/logout' : '/auth/twitter';
    window.location.replace(route);
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar} variant="dense">
        <Button className={classes.button} onClick={handleClick}>
          {isLoggedIn ? 'logout' : 'login'}
          <Icon className={`fab fa-twitter fa-1x ${classes.icon}`} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  state: PropTypes.shape({
    bars: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.object),
        id: PropTypes.string,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        peopleGoing: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.string,
        rating: PropTypes.number,
        reviewCount: PropTypes.number,
        url: PropTypes.string,
      })
    ),
    location: PropTypes.string,
    offset: PropTypes.number,
  }).isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    icon: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(NavBar);
