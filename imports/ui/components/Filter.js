import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Filter extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          className={classes.button}
          onClick={this.handleClick}
        >
          <FilterListIcon />
        </IconButton >
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
      </div>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);