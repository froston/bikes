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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    width: 400
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  navButton: {
    marginTop: 20
  },
  title: {
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
    catMain: [],
    catSecond: [],
    catThird: [],
    mainCats: [],
    secCats: [],
    thirdCats: []
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

  loadThirdCats = secCat => {
    Meteor.call('products.getThirdCat', secCat, (err, thirdCats) => {
      this.setState({ thirdCats })
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleReset = () => {
    this.setState({
      anchorEl: null,
      catMain: [],
      catSecond: [],
      catThird: [],
      secCats: [],
      thirdCats: []
    }, this.handleFilter);
  }

  handleMainChange = event => {
    const catMain = event.target.value
    this.loadSecCats(catMain)
    this.setState({ catMain, catSecond: [] }, this.handleFilter);
  };

  handleSecChange = event => {
    const catSecond = event.target.value
    this.loadThirdCats(catSecond)
    this.setState({ catSecond, catThird: [] }, this.handleFilter);
  };

  handleThirdChange = event => {
    this.setState({ catThird: event.target.value }, this.handleFilter);
  };

  handleFilter = () => {
    const { catMain, catSecond, catThird } = this.state
    this.props.handleFilter({ catMain, catSecond, catThird })
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, mainCats, catMain, secCats, catSecond, thirdCats, catThird } = this.state;
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
            <Typography variant="h6" gutterBottom>
              Nastavit filtry
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="cat-label-placeholder">Hlavní Kategorie</InputLabel>
                  <Select
                    multiple
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
                  <InputLabel shrink htmlFor="cat-label-placeholder">Podkategorie Kategorie</InputLabel>
                  <Select
                    multiple
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
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="cat-label-placeholder">Vedlejší Kategorie</InputLabel>
                  <Select
                    multiple
                    value={catThird}
                    onChange={this.handleThirdChange}
                    input={<Input name="category" id="cat-label-placeholder" />}
                    displayEmpty
                    name="category"
                    disabled={thirdCats.length === 0}
                  >
                    {thirdCats.map(cat => {
                      return <MenuItem key={cat} value={cat}>{cat.trim()}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-end">
              <Grid item>
                <Button color="secondary" className={classes.navButton} onClick={this.handleReset}>Obnovit</Button>
              </Grid>
              <Grid item>
                <Button color="primary" className={classes.navButton} onClick={this.handleClose}>OK</Button>
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

