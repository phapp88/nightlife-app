import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  fab: {
    margin: '0 5px',
  },
};

const Pagination = ({
  bars,
  classes,
  handleBackBtnClick,
  handleNextBtnClick,
  offset,
}) => (
  <div>
    {offset > 0 && (
      <Fab className={classes.fab} color="primary" onClick={handleBackBtnClick}>
        <Icon className="fas fa-arrow-left fa-1x" />
      </Fab>
    )}
    {bars.length > 0 && (
      <Fab className={classes.fab} color="primary" onClick={handleNextBtnClick}>
        <Icon className="fas fa-arrow-right fa-1x" />
      </Fab>
    )}
  </div>
);

Pagination.propTypes = {
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
    }),
  ).isRequired,
  classes: PropTypes.shape({
    fab: PropTypes.string,
  }).isRequired,
  handleBackBtnClick: PropTypes.func.isRequired,
  handleNextBtnClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};

export default withStyles(styles)(Pagination);
