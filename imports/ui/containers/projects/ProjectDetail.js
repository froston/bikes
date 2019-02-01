import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Tracker } from 'meteor/tracker'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Projects } from '../../../api/projects';
import TextField from '@material-ui/core/TextField';
import { ProjectItems } from './'

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
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  cardActions: {
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

class ProjectDetail extends React.Component {
  state = {
    tab: 0,
    name: '',
    items: [],
    modal: false
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params && match.params.id) {
      this.loadData(match.params.id)
    }
  }

  loadData = _id => {
    Tracker.autorun(() => {
      Meteor.subscribe('project', _id);
      let project = Projects.findOne(_id);
      if (project) {
        this.setState({
          _id: project._id,
          name: project.name,
          items: project.items || [],
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('projects.save', this.state);
    this.props.history.push('/projekty')
  }

  changeTab = (e, tab) => this.setState({ tab })

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addItem = (item) => {
    this.setState({ items: this.state.items.concat(item) })
  }

  render() {
    const { classes } = this.props
    const { tab, name, items } = this.state
    return (
      <Paper square>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.changeTab}
        >
          <Tab label="Obecné" />
          <Tab label="Dily" />
        </Tabs>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <div style={{ display: tab === 0 ? 'block' : 'none' }}>
                <div className={classes.container}>
                  <TextField
                    label="Nazev projetku"
                    className={classes.textField}
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </div>
              </div>
              <div style={{ display: tab === 1 ? 'block' : 'none' }}>
                <div className={classes.container}>
                  <ProjectItems items={items} addItem={this.addItem} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <SaveIcon className={classes.leftIcon} />
              Uložit
            </Button>
            <Button
              onClick={this.toggleModal}
              color="secondary"
              className={classes.button}
            >
              <SaveIcon className={classes.leftIcon} />
              Smazat
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}


export default withStyles(styles)(withRouter(ProjectDetail));