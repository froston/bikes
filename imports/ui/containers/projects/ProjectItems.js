import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Table, ProductsModal } from '../../components'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
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
    { id: 'price_vo', label: 'Cena VO' },
    { id: 'price_mo', label: 'Cena MO' },
    {
      id: 'actions', label: '', render: (text, rec, index) => {
        return (
          <IconButton onClick={e => this.removeItem(e, index)}>
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

  removeItem = index => {
    this.props.removeItem(index)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { items, classes } = this.props;
    const { modal } = this.state;
    console.log(items)
    return (
      <div style={{ width: '100%' }}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="item">Druh dílu</InputLabel>
          <Select
            value={this.state.item}
            onChange={this.handleChange}
            inputProps={{ name: 'item', id: 'item', }}
          >
            <MenuItem value='dil1'>Vidlice</MenuItem>
            <MenuItem value='dil2'>Riditka</MenuItem>
          </Select>
        </FormControl>
        <Button
          label="Pridat Item"
          onClick={this.toggleModal}
          variant="outlined"
          color="primary"
        >
          <AddIcon />
          Přidat produkt
        </Button>
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
    );
  }
}

ProjectItems.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  addItem: PropTypes.func,
};

export default withStyles(styles)(ProjectItems);