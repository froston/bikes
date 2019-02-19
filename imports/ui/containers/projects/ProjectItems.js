import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, ProductsModal } from '../../components'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  table: {
    marginTop: 20
  },
})

class ProjectItems extends React.Component {
  state = {
    modal: false,
    item: ''
  }
  rows = [
    { id: 'item', label: 'Díl' },
    { id: 'eshop', label: 'E-shop' },
    { id: 'name', label: 'Název' },
    { id: 'price_vo', label: 'Cena VOC' },
    { id: 'price_mo', label: 'Cena MOC' },
    {
      id: 'actions', label: '', render: (text, rec) => {
        return (
          <IconButton onClick={e => this.removeItem(e, rec._id)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    }
  ];
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  addItem = (item) => {
    item.item = this.state.item
    this.props.addItem(item)
    this.toggleModal()
  }

  removeItem = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.removeItem(id)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { items, classes } = this.props;
    const { modal } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container alignItems="center" spacing={24}>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="item">Druh dílu</InputLabel>
                <Select
                  value={this.state.item}
                  onChange={this.handleChange}
                  inputProps={{ name: 'item', id: 'item', }}
                >
                  <MenuItem value='dil1'>Díl 1</MenuItem>
                  <MenuItem value='dil2'>Díl 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                label="Přidat Item"
                onClick={this.toggleModal}
                variant="outlined"
                color="primary"
              >
                <AddIcon />
                Přidat produkt
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.table}>
          <Table
            rows={this.rows}
            data={items}
          />
          <ProductsModal
            open={modal}
            handleClose={this.toggleModal}
            handleClick={this.addItem}
          />
        </div>
      </div>
    );
  }
}

ProjectItems.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

export default withStyles(styles)(ProjectItems);