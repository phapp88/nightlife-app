import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    margin: '0 5px',
  },
};

const Pagination = ({
  bars, classes, handleBackBtnClick, handleNextBtnClick, offset,
}) => (
  <div>
    {offset > 0 && (
      <Button className={classes.button} color="primary" onClick={handleBackBtnClick} variant="fab">
        <i className="fas fa-arrow-left" />
      </Button>
    )}
    {bars.length > 0 && (
      <Button className={classes.button} color="primary" onClick={handleNextBtnClick} variant="fab">
        <i className="fas fa-arrow-right" />
      </Button>
    )}
  </div>
);

Pagination.propTypes = {
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
  }).isRequired,
  handleBackBtnClick: PropTypes.func.isRequired,
  handleNextBtnClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};

export default withStyles(styles)(Pagination);
