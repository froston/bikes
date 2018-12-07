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

const getParentUrl = p => p.split('/')[1] || '/'; // the menu key is always parent url

const MainMenu = ({ pathname }) => {
  const isSelected = p => p === getParentUrl(pathname)
  return (
    <List>
      <Link to="/projekty">
        <ListItem button selected={isSelected('projekty')}>
          <ListItemIcon><MotorcycleIcon /></ListItemIcon>
          <ListItemText primary="Projekty" />
        </ListItem>
      </Link>
      <Link to="/dily">
        <ListItem button selected={isSelected('dily')}>
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Díly" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/eshopy">
        <ListItem button selected={isSelected('eshopy')}>
          <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="E-shopy" />
        </ListItem>
      </Link >
    </List >
  )
}

export default MainMenu