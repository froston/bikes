import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class SetColumns extends React.Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (name, value) => {
    this.props.handleChange(name, value)
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, columns } = this.props;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          className={classes.button}
          onClick={this.handleOpen}
        >
          <ViewColumnIcon />
        </IconButton >
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          {Object.keys(columns).map(key => {
            return (
              <MenuItem key={key}>
                <FormControlLabel
                  control={<Checkbox checked={columns[key]} />}
                  label={key}
                  onChange={() => this.handleChange(key, !columns[key])}
                />
              </MenuItem>
            )
          })}

        </Menu>
      </div>
    );
  }
}

SetColumns.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  columns: PropTypes.object,
}

export default withStyles(styles)(SetColumns)

