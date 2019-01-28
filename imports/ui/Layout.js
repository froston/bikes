import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Switch, Route } from 'react-router-dom'
import { AppBar, MainMenu } from './components'
import { EshopDetail, EshopsList, ProjectsList, ProjectDetail, ProductDetail, ProductsContainer } from './containers'

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
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        <AppBar />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MainMenu pathname={location.pathname} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/projekty" component={ProjectsList} />
            <Route exact path="/projekty/novy" component={ProjectDetail} />
            <Route exact path="/produkty" component={ProductsContainer} />
            <Route exact path="/produkty/:id" component={ProductDetail} />
            <Route exact path="/eshopy" component={EshopsList} />
            <Route path="/eshopy/novy" component={EshopDetail} />
            <Route path="/eshopy/:id" component={EshopDetail} />
          </Switch>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Layout));