import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StatusSelect } from '../components'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    width: 400
  },
  button: {
    margin: theme.spacing.unit,
  },
  navButton: {
    marginTop: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
});

class FilterProjects extends React.Component {
  state = {
    anchorEl: null,
    status: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleReset = () => {
    this.setState({
      anchorEl: null,
      status: null,
    }, this.handleFilter);
  }

  handleChange = event => {
    const status = event.target.value
    this.setState({ status }, this.handleFilter);
  };

  handleFilter = () => {
    const { status } = this.state
    this.props.handleFilter({ status })
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, status } = this.state;
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
          <form className={classes.root} autoComplete="off">
            <Typography variant="h6" gutterBottom>
              Nastavit filtry
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <StatusSelect value={status} onChange={this.handleChange} />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-end">
              <Grid item>
                <Button
                  color="secondary"
                  className={classes.navButton}
                  onClick={this.handleReset}>
                  Obnovit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  className={classes.navButton}
                  onClick={this.handleClose}>
                  OK
                </Button>
              </Grid>
            </Grid>
          </form>
        </Popover>
      </div>
    );
  }
}

FilterProjects.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterProjects)

