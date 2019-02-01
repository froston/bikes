import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    width: 300
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
});

class Filter extends React.Component {
  state = {
    anchorEl: null,
    catMain: '',
    catSecond: '',
    mainCats: [],
    secCats: [],
  }

  componentDidMount() {
    Meteor.call('products.getMainCat', (err, mainCats) => {
      this.setState({ mainCats })
    })
  }

  loadSecCats = mainCat => {
    Meteor.call('products.getSecCat', mainCat, (err, secCats) => {
      this.setState({ secCats })
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleMainChange = event => {
    const catMain = event.target.value
    this.loadSecCats(catMain)
    this.setState({ catMain, catSecond: '' }, this.handleFilter);
  };

  handleSecChange = event => {
    this.setState({ catSecond: event.target.value }, this.handleFilter);
  };

  handleFilter = () => {
    const { catMain, catSecond } = this.state
    this.props.handleFilter({ catMain, catSecond })
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, mainCats, catMain, secCats, catSecond } = this.state;
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
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="cat-label-placeholder">Hlavní Kategorie</InputLabel>
                  <Select
                    value={catMain}
                    onChange={this.handleMainChange}
                    input={<Input name="category" id="cat-label-placeholder" />}
                    displayEmpty
                    name="category"
                  >
                    {mainCats.map(cat => {
                      return <MenuItem key={cat} value={cat}>{cat.trim()}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="cat-label-placeholder">Vedlejší Kategorie</InputLabel>
                  <Select
                    value={catSecond}
                    onChange={this.handleSecChange}
                    input={<Input name="category" id="cat-label-placeholder" />}
                    displayEmpty
                    name="category"
                    disabled={secCats.length === 0}
                  >
                    {secCats.map(cat => {
                      return <MenuItem key={cat} value={cat}>{cat.trim()}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Popover>
      </div>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(Filter)

