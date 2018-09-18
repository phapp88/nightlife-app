import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  paper: {
    display: 'inline-block',
    width: '235px',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  toolbar: {
    minHeight: '46px',
  },
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { getBarData } = this.props;
    const { location } = this.state;
    getBarData(location);
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;
    return (
      <form autoComplete="off" className={classes.root} onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
            <Input
              disableUnderline
              onChange={this.handleChange}
              placeholder="Enter your city"
              startAdornment={(
                <InputAdornment position="start">
                  <i className="fas fa-search" />
                </InputAdornment>
              )}
              name="location"
              value={location}
            />
          </Toolbar>
        </Paper>
        <Button className={classes.button} color="primary" type="submit" variant="contained">
          Search
        </Button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    paper: PropTypes.string,
    root: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
  getBarData: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);
