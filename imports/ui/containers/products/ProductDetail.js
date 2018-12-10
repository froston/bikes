import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Tracker } from 'meteor/tracker'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Products } from '../../../api/products';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  img: {
    width: 'initial',
    minWidth: 'initial',
    maxWidth: '42em',
    maxHeight: '15em',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class ProductDetail extends React.Component {
  state = {
    _id: '',
    code: '',
    name: '',
    ean: '',
    photo: '',
    price_mo: '',
    price_vo: '',
    producer: '',
    unit: '',
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params && match.params.id) {
      this.loadData(match.params.id)
    }
  }

  loadData = _id => {
    Tracker.autorun(() => {
      Meteor.subscribe('product', _id);
      let product = Products.findOne(_id);
      if (product) {
        this.setState({ ...product });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('products.save', this.state);
    this.props.history.push('/produkty')
  }

  render() {
    const { classes } = this.props
    const { code, name, photo, price_mo, price_vo, producer, amount, unit } = this.state
    console.log(this.state)
    return (
      <Paper square>
        <Card>
          <CardContent>
            <div className={classes.root}>
              <Grid container spacing={16}>
                <Grid item sm={4}>
                  <img src={photo} alt="Náhled produktu" className={classes.img} />
                </Grid >
                <Grid item sm={4}>
                  <TextField
                    label="Kod"
                    className={classes.textField}
                    value={code}
                    margin="normal"
                    disabled
                  />
                  <TextField
                    label="Ean"
                    className={classes.textField}
                    value={code}
                    margin="normal"
                    disabled
                  />
                  <TextField
                    label="Nazev"
                    className={classes.textField}
                    value={name}
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Skladem"
                    className={classes.textField}
                    value={amount + unit}
                    margin="normal"
                  />
                  <TextField
                    label="Cena MO"
                    className={classes.textField}
                    value={price_mo}
                    margin="normal"
                  />
                  <TextField
                    label="Cena VO"
                    className={classes.textField}
                    value={price_vo}
                    margin="normal"
                  />
                  <TextField
                    label="Producer"
                    className={classes.textField}
                    value={producer}
                    margin="normal"
                  />
                </Grid >
              </Grid >
            </ div>
          </CardContent>
          <CardActions>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
            >
              <SaveIcon className={classes.leftIcon} />
              Uložit
            </Button>
          </CardActions>
        </Card>
      </Paper >
    );
  }
}


export default withStyles(styles)(withRouter(ProductDetail));