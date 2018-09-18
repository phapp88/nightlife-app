import fetch from 'isomorphic-unfetch';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Bars from '../components/Bars';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

const styles = {
  filler: {
    height: '48px',
  },
  root: {
    margin: '30px',
    textAlign: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
    };
    this.changeRsvp = this.changeRsvp.bind(this);
    this.getBarData = this.getBarData.bind(this);
  }

  async getBarData(location) {
    try {
      const res = await fetch(`/api/bars?location=${location}`);
      const json = await res.json();
      if (json.error) {
        throw new Error();
      }
      this.setState({ bars: json });
    } catch (err) {
      console.log(err); // TODO: handle error
    }
  }

  async changeRsvp(bar) {
    const { username } = this.props;
    const { bars } = this.state;
    try {
      const res = await fetch('/api/bars', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bar, username }),
      });
      const json = await res.json();
      const { peopleGoing, yelpId: updatedBarId } = json.value;
      this.setState({
        bars: bars.map(barr => (
          barr.id === updatedBarId ? { ...barr, peopleGoing } : barr
        )),
      });
    } catch (err) {
      console.log(err); // TODO: handle error
    }
  }

  render() {
    const { classes, username } = this.props;
    const { bars } = this.state;
    return (
      <div className={classes.root}>
        <NavBar isLoggedIn={username !== ''} />
        <div className={classes.filler} />
        <Typography className={classes.title} variant="display2">
          Nightlife Coordination App
        </Typography>
        <Typography paragraph variant="subheading">
          Search your area for bars, see who&apos;s going where, and join in on the fun!
        </Typography>
        <SearchBar getBarData={this.getBarData} />
        <Bars bars={bars} changeRsvp={this.changeRsvp} username={username} />
      </div>
    );
  }
}

Index.getInitialProps = ({ req }) => {
  const username = Object.prototype.hasOwnProperty.call(req, 'user')
    ? req.user.oauth_id
    : '';
  return { username };
};

Index.propTypes = {
  classes: PropTypes.shape({
    filler: PropTypes.string,
    root: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(Index);
