import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Info from './Info'
import XmlAtr from './XmlAtr'

import { Eshops } from '../../../api/eshops';
import { Tracker } from 'meteor/tracker'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class CreateEshop extends React.Component {
  state = {
    value: 0,
    _id: null,
    eshop: '',
    url: '',
    name: '',
    id: '',
    item: '',
    ean: '',
    producer: '',
    category: '',
    delimiter: '',
    price_vo: '',
    price_mo: '',
    amount: '',
    unit: '',
    photo: '',
    autoUpdate: false
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params && match.params.id) {
      this.loadData(match.params.id)
    }
  }

  loadData = id => {
    Tracker.autorun(() => {
      Meteor.subscribe('eshop', id);
      let eshop = Eshops.findOne({ _id: id });
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
    this.props.history.push(`/eshopy`)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props
    const { value } = this.state
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
                <XmlAtr handleChange={this.handleChange} values={this.state} />
              </div>
            </form>
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


export default withStyles(styles)(withRouter(CreateEshop));