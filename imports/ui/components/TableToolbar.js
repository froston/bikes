import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  actionButtons: {
    width: 350,
    zIndex: 2,
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    flex: '0 0 auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} vybráno
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {props.title}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Smazat">
            <IconButton aria-label="Smazat" onClick={props.handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <div className={classes.actionButtons}>
              <Tooltip title="Filtr">
                <Button size="small" className={classes.button} onClick={props.handleCreate}>
                  <FilterListIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Filtr
                </Button>
              </Tooltip>
              {props.handleCreate &&
                <Tooltip title="Vytvořit">
                  <Button size="small" className={classes.button} onClick={props.handleCreate} >
                    <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Vytvořit nový
                  </Button>
                </Tooltip>
              }
            </div>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);