import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const ApplicationBar = (props) => {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Skládka Kol
          </Typography>
      </Toolbar>
    </AppBar>
  );
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicationBar);