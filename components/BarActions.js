import CardActions from '@material-ui/core/CardActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  label: {
    position: 'relative',
    right: '5px',
    top: '1px',
    width: '54px',
  },
  link: {
    flex: 1,
  },
};

const BarActions = ({
  bar, classes, changeRsvp, username,
}) => (
  <CardActions>
    <a className={classes.link} href={bar.url} target="_blank" rel="noreferrer noopener">
      <img alt="yelp logo" src="/static/Yelp_trademark_RGB_outline.png" width="70px" />
    </a>
    <FormControlLabel
      classes={{ label: classes.label }}
      control={(
        <Switch
          checked={bar.peopleGoing.includes(username)}
          disabled={username === ''}
          color="primary"
          onChange={() => changeRsvp(bar)}
        />
      )}
      label={`${bar.peopleGoing.length} GOING`}
    />
  </CardActions>
);

BarActions.propTypes = {
  bar: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    peopleGoing: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  changeRsvp: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(BarActions);
