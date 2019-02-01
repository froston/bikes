import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    { id: 'name', label: 'Název' },
    { id: 'eshop', label: 'E-shop' },
  ];
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }
  handleClick = (item) => {
    item.item = this.state.item
    this.props.addItem(item)
    this.toggleModal()
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { items, classes } = this.props;
    const { modal } = this.state;
    console.log(items)
    return (
      <div>
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
          handleClick={this.handleClick}
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