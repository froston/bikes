import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom'
import { AppBar, MainMenu } from './components'
import { CreateEshop, EshopsList, ProjectsList } from './containers'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component {
  state = {
    open: false
  }
  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MainMenu />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/projekty" component={ProjectsList} />
            <Route exact path="/dily" component={null} />
            <Route exact path="/eshopy" component={EshopsList} />
            <Route path="/eshopy/create" component={CreateEshop} />
            <Route path="/eshopy/:id" component={CreateEshop} />
          </Switch>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);