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

const NavBar = ({ bars, classes, isLoggedIn }) => {
  const handleClick = () => {
    try {
      localStorage.setItem('bars', JSON.stringify(bars));
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
          <i className={`fab fa-twitter ${classes.icon}`} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    peopleGoing: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string,
    icon: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(NavBar);
