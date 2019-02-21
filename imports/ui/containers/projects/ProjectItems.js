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
import { Table, ProductsModal, ItemTypes } from '../../components'
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
    modal: false,
    item: '',
    amount: 1
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
    { id: 'amount', label: 'Mnozstvi' },
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

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  addItem = (item) => {
    item.item = this.state.item
    item.amount = this.state.amount
    this.props.addItem(item)
    this.setState({ item: '', amount: 1 })
    this.toggleModal()
    // add new item type in storage
    addItemType(this.state.item)
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
    const { modal } = this.state;
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
                  value={this.state.amount}
                  onChange={this.handleChange('amount')}
                />
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

export default withStyles(styles)(ProjectItems)
