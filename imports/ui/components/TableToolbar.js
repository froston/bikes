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
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SetColumns } from '../components'

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
  createButton: {
    marginTop: 15,
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
  searchField: {
    margin: theme.spacing.unit,
    width: 350
  },
});
class EnhancedTableToolbar extends React.Component {
  state = {
    search: false
  }
  toggleSearch = () => {
    if (this.state.search) {
      this.props.handleSearch({ target: { value: null } })
    }
    this.setState({ search: !this.state.search })
  }
  toggleColumns = () => { }
  render() {
    const { numSelected, classes, title, filter, setColumns } = this.props;
    const { search } = this.state
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
              search ?
                <TextField
                  autoFocus
                  className={classes.searchField}
                  label="Hledat"
                  onChange={this.props.handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Zavrit" onClick={this.toggleSearch}>
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                :
                <Typography variant="h6">
                  {title}
                </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Smazat">
              <IconButton aria-label="Smazat" onClick={this.props.handleRemove}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
              <div className={classes.actionButtons}>
                <Tooltip title="Hledat">
                  <IconButton className={classes.button} onClick={this.toggleSearch}>
                    <SearchIcon />
                  </IconButton >
                </Tooltip>
                {this.props.setColumns &&
                  <Tooltip title="Nastavit sloupce">
                    {setColumns}
                  </Tooltip>
                }
                {this.props.filter &&
                  <Tooltip title="Filtr">
                    {filter}
                  </Tooltip>
                }
                {this.props.handleCreate &&
                  <Tooltip title="Vytvořit">
                    <Button size="small" className={classNames(classes.button, classes.createButton)} onClick={this.props.handleCreate} >
                      <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Vytvořit nový
                  </Button>
                  </Tooltip>
                }
              </div>
            )}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleRemove: PropTypes.func,
  handleCreate: PropTypes.func,
  setColumns: PropTypes.any,
  filter: PropTypes.any,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);