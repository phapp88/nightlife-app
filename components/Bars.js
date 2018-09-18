import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import BarActions from './BarActions';
import BarContent from './BarContent';

const styles = theme => ({
  image: {
    objectFit: 'cover',
    height: '300px',
  },
  root: {
    display: 'grid',
    gridGap: '20px',
    margin: '32px auto',
    maxWidth: '500px',
    textAlign: 'left',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
      maxWidth: '1000px',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      maxWidth: '1300px',
    },
  },
});

const Bars = ({
  bars, changeRsvp, classes, username,
}) => (
  <div className={classes.root}>
    {bars.map(bar => (
      <Card key={bar.id}>
        <a href={bar.url} target="_blank" rel="noreferrer noopener">
          <CardMedia className={classes.image} component="img" image={bar.imageUrl} />
        </a>
        <BarContent bar={bar} />
        <BarActions bar={bar} changeRsvp={changeRsvp} username={username} />
      </Card>
    ))}
  </div>
);

Bars.propTypes = {
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
  changeRsvp: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    image: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(Bars);
