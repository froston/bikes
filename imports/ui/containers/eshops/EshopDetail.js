import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Tracker } from 'meteor/tracker'
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { Eshops } from '../../../api/eshops';
import Info from './Info'
import XmlAtr from './XmlAtr'

const styles = theme => ({
  wrapper: {
    position: 'relative'
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonLast: {
    margin: theme.spacing.unit,
    marginLeft: 'auto'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  cardActions: {
    display: 'flex',
    background: '#f5f5f5'
  }
})

class EshopDetail extends React.Component {
  state = {
    value: 0,
    updatting: false,
    updated: false,
    message: null,
    _id: null,
    eshop: '',
    url: '',
    name: '',
    id: '',
    item: '',
    ean: '',
    producer: '',
    category: '',
    ignoreFirst: false,
    delimiter: '',
    price_vo: '',
    price_mo: '',
    amount: '',
    unit: '',
    photo: '',
    prodUrl: '',
    autoUpdate: false
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params && match.params.id) {
      this.loadData(match.params.id)
    }
  }

  loadData = _id => {
    Tracker.autorun(() => {
      Meteor.subscribe('eshop', _id);
      let eshop = Eshops.findOne(_id);
      if (eshop) {
        this.setState({
          _id: eshop._id,
          eshop: eshop.name,
          url: eshop.url,
          autoUpdate: eshop.autoUpdate,
          ...eshop.attributes
        });
      }
    });
  }

  changeTab = (e, value) => this.setState({ value })

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('eshops.save', this.state);
    this.props.history.push('/eshopy')
  }

  handleUpdate = () => {
    this.setState({ updatting: true, updated: false, message: null })
    Meteor.call('eshops.save', this.state);
    Meteor.call('eshops.update', this.state._id, (err, res) => {
      const message = err ? "Pri importu nastala chyba" : `${res.inserted} produktu vytvoreno, ${res.updated} upraveno`
      this.setState({ updatting: false, updated: true, message })
    });
  };

  handleDeleteProducts = () => {
    Meteor.call('products.removeByEshop', this.state.eshop, (err, res) => {
      this.props.history.push('/eshopy')
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props
    const { value, updatting, updated, message } = this.state
    return (
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.changeTab}
        >
          <Tab label="Obecné" />
          <Tab label="XML Atributy" />
        </Tabs>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <div style={{ display: value === 0 ? 'block' : 'none' }}>
                <Info handleChange={this.handleChange} handleCheck={this.handleCheck} values={this.state} />
              </div>
              <div style={{ display: value === 1 ? 'block' : 'none' }}>
                <XmlAtr handleChange={this.handleChange} handleCheck={this.handleCheck} values={this.state} />
              </div>
            </form>
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
            {this.state._id &&
              <div className={classes.wrapper}>
                <Button
                  onClick={this.handleUpdate}
                  color="primary"
                  className={classes.button}
                  disabled={updatting}
                >
                  {updated ? <CheckIcon className={classes.leftIcon} /> : <CachedIcon className={classes.leftIcon} />}
                  {updated ? message : 'Aktualizovat produkty'}
                </Button>
                {updatting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            }
            {this.state._id &&
              <Button
                onClick={this.handleDeleteProducts}
                color="secondary"
                className={classes.buttonLast}
              >
                <ClearIcon className={classes.leftIcon} />
                Smazat produkty
              </Button>
            }
          </CardActions>
        </Card>
      </Paper >
    );
  }
}


export default withStyles(styles)(withRouter(EshopDetail));