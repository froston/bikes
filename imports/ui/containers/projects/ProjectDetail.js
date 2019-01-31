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
import { ProductsModal } from '../../components'

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
  }
})

class ProjectDetail extends React.Component {
  state = {
    name: '',
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
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('projects.save', this.state);
    this.props.history.push('/projekty')
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openModal = () => {
    this.setState({ modal: true })
  }

  render() {
    const { classes } = this.props
    const { name, modal } = this.state
    return (
      <Paper square>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.changeTab}
        >
          <Tab label="Obecné" />
        </Tabs>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <div>
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
            </form>
            <ProductsModal open={modal} handleClose={() => { alert(1) }} />
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
            <Button
              onClick={this.openModal}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
            >
              <SaveIcon className={classes.leftIcon} />
              Najit Neco
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}


export default withStyles(styles)(withRouter(ProjectDetail));