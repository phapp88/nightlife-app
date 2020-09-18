import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  infoRow1: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '5px',
  },
  paragraph: {
    display: 'inline',
    fontSize: '15px',
    wordWrap: 'break-word',
  },
  price: {
    marginRight: '3px',
  },
  priceSpan: {
    color: '#85bb65',
  },
  reviewCount: {
    marginLeft: '7px',
  },
  reviewCountSpan: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const BarContent = ({ bar, classes }) => (
  <CardContent>
    <Typography component="h2" gutterBottom variant="h5">
      {bar.name}
    </Typography>
    <div className={classes.infoRow1}>
      <img alt="rating" src={`/large_${bar.rating}.png`} />
      <Typography className={`${classes.paragraph} ${classes.reviewCount}`}>
        {bar.reviewCount}{' '}
        <span className={classes.reviewCountSpan}>reviews</span>
      </Typography>
    </div>
    <div>
      {bar.price !== '' && (
        <Typography className={`${classes.paragraph} ${classes.price}`}>
          <span className={classes.priceSpan}>{bar.price}</span>
          {' \u00B7'}
        </Typography>
      )}
      <Typography className={classes.paragraph}>
        {bar.categories.map((category) => category.title).join(' \u00B7 ')}
      </Typography>
    </div>
  </CardContent>
);

BarContent.propTypes = {
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
    infoRow1: PropTypes.string,
    paragraph: PropTypes.string,
    price: PropTypes.string,
    priceSpan: PropTypes.string,
    reviewCount: PropTypes.string,
    reviewCountSpan: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(BarContent);
