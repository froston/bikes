import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

class MainMenu extends React.PureComponent {
  render() {
    return (
      <List>
        <ListItem button>
          <ListItemIcon><MotorcycleIcon /></ListItemIcon>
          <ListItemText primary="Projekty" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Díly" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="E-shopy" />
        </ListItem>
      </List>
    )
  }
}

export default MainMenu