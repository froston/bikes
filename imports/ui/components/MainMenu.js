import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import { Link } from 'react-router-dom'

const MainMenu = (props) => (
  <List>
    <Link to="/projekty">
      <ListItem button>
        <ListItemIcon><MotorcycleIcon /></ListItemIcon>
        <ListItemText primary="Projekty" />
      </ListItem>
    </Link>
    <Link to="/dily">
      <ListItem button>
        <ListItemIcon><BuildIcon /></ListItemIcon>
        <ListItemText primary="Díly" />
      </ListItem>
    </Link>
    <Divider />
    <Link to="/eshopy">
      <ListItem button>
        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
        <ListItemText primary="E-shopy" />
      </ListItem>
    </Link >
  </List >
)

export default MainMenu