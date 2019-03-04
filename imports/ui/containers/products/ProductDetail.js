import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Products } from '../../../api/products';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 40
  },
  url: {
    color: 'black'
  },
  categories: {
    margin: '10px 0 30px'
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
  },
  chip: {
    margin: theme.spacing.unit,
  },
  cardActions: {
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between'
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
    eshop: '',
    weight: '',
    url: ''
  }

  componentDidMount() {
    this.setState({ ...this.props.product })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('products.save', this.state);
    if (!!this.props.handleClick) {
      this.props.handleClick(this.state)
    } else {
      this.props.history.push('/produkty')
    }
  }

  handleDelete = e => {
    e.preventDefault()
    Meteor.call('products.remove', this.state._id);
    this.props.history.push('/produkty')
  }

  render() {
    const { classes } = this.props
    const { code, url, ean, name, category, photo, price_mo, price_vo, producer, amount, unit, eshop, weight } = this.state
    return (
      <Paper square>
        <Card>
          <CardContent>
            <Typography variant="h5" color="inherit" noWrap>
              <a href={url} target="_blank" className={classes.url}>{eshop} - {name}</a>
            </Typography>
            <div className={classes.categories}>
              {category && category.map((cat, index) => (
                <Chip
                  key={index}
                  label={cat}
                  className={classes.chip}
                />
              ))}
            </div>
            <div className={classes.root}>
              <Grid container spacing={40} className={classes.container}>
                <Grid item sm={3}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={photo} alt="Náhled produktu" className={classes.img} />
                  </div>
                </Grid >
                <Grid item xs={12} sm={3}>
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
                    onChange={this.handleChange('ean')}
                    value={ean}
                    margin="normal"
                  />
                  <TextField
                    label="Vyrobce"
                    className={classes.textField}
                    onChange={this.handleChange('producer')}
                    value={producer}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Skladem"
                    className={classes.textField}
                    onChange={this.handleChange('amount')}
                    value={String(amount)}
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">{unit}</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Cena MO"
                    className={classes.textField}
                    onChange={this.handleChange('price_mo')}
                    value={price_mo}
                    margin="normal"
                  />
                  <TextField
                    label="Cena VO"
                    className={classes.textField}
                    onChange={this.handleChange('price_vo')}
                    value={price_vo}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Hmotnost"
                    className={classes.textField}
                    onChange={this.handleChange('weight')}
                    value={weight}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions className={classes.cardActions} disableActionSpacing>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <SaveIcon className={classes.leftIcon} />
              Uložit
            </Button>
            {!this.props.handleClick &&
              <Button
                onClick={this.handleDelete}
                className={classes.button}
                color="secondary"
              >
                <ClearIcon className={classes.leftIcon} />
                Smazat
            </Button>
            }
          </CardActions>
        </Card>
      </Paper >
    );
  }
}

export default withTracker(props => {
  const _id = props.match ? props.match.params.id : props.id
  Meteor.subscribe('product', _id);
  return {
    product: Products.findOne({ _id }),
  }
})(withStyles(styles)(withRouter(ProductDetail)));