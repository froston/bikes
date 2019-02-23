import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { Table, ProductsModal, ProductModal, ItemTypes } from '../../components'
import { addItemType } from '../../utils/storage'

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
    modalProd: false,
    modalList: false,
    prodId: null,
    item: '',
    quantity: 1
  }

  rows = [
    { id: 'item', label: 'Díl' },
    {
      id: 'photo', label: 'Náhled', render: photo => (
        <Avatar alt="Foto produktu" src={photo} className={this.props.classes.avatar} />
      )
    },
    { id: 'eshop', label: 'E-shop' },
    { id: 'name', label: 'Název' },
    { id: 'price_mo', label: 'Cena MOC' },
    { id: 'price_vo', label: 'Cena VOC' },
    { id: 'quantity', label: 'Mnozstvi' },
    {
      id: 'actions', label: '', render: (text, rec) => {
        return (
          <IconButton onClick={e => this.removeItem(e, rec._id)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    }
  ]

  toggleModalProd = () => {
    this.setState({ modalProd: !this.state.modalProd })
  }

  toggleModalList = () => {
    this.setState({ modalList: !this.state.modalList })
  }

  openProduct = (v) => {
    this.setState({ prodId: v._id })
    this.toggleModalProd()
  }

  addItem = (item) => {
    item.item = this.state.item
    item.quantity = this.state.quantity
    this.props.addItem(item)
    this.setState({ item: '', quantity: 1 })
    this.toggleModalList()
    // add new item type in storage
    addItemType(this.state.item)
  }

  updateItem = item => {
    this.props.updateItem(item)
    this.toggleModalProd()
  }

  removeItem = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.removeItem(id)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    const { items, classes } = this.props;
    const { modalList, modalProd } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container alignItems="center" spacing={24}>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <ItemTypes
                  value={this.state.item}
                  handleChange={item => this.setState({ item })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Mnozstvi"
                  type="number"
                  value={this.state.quantity}
                  onChange={this.handleChange('quantity')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                label="Přidat dil"
                onClick={this.toggleModalList}
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
            handleClick={this.openProduct}
          />
          <ProductModal
            open={modalProd}
            handleClick={this.updateItem}
            handleClose={this.toggleModalProd}
            id={this.state.prodId}
          />
          <ProductsModal
            open={modalList}
            handleClose={this.toggleModalList}
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

export default withStyles(styles)(ProjectItems)
