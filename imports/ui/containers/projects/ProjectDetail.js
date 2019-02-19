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
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { ProjectItems } from './'
import { Projects } from '../../../api/projects';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  addInput: {
    margin: '20px 0'
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
    description: '',
    panelName: '',
    panels: [],
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
          description: project.description,
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

  addPanel = () => {
    const { panelName } = this.state
    this.setState({ panels: [...this.state.panels, panelName], panelName: '' })
  }

  addItem = (item) => {
    this.setState({ items: this.state.items.concat(item) })
  }

  render() {
    const { classes } = this.props
    const { tab, name, description, items } = this.state
    return (
      <Paper square>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.changeTab}
        >
          <Tab label="Obecné" />
          <Tab label="Díly" />
        </Tabs>
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <div style={{ display: tab === 0 ? 'block' : 'none' }}>
                <div className={classes.container}>
                  <TextField
                    label="Název projetku"
                    className={classes.textField}
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </div>
                <div className={classes.container}>
                  <TextField
                    label="Popis"
                    className={classes.textField}
                    multiline
                    rows="4"
                    value={description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                  />
                </div>
              </div>
              <div style={{ display: tab === 1 ? 'block' : 'none' }}>
                <TextField
                  label="Přidat sekci"
                  variant="outlined"
                  className={[classes.textField, classes.addInput]}
                  value={this.state.panelName}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      this.addPanel()
                    }
                  }}
                  onChange={this.handleChange('panelName')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Přidat panel"
                          onClick={this.addPanel}
                        >
                          <AddBoxIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {this.state.panels.map(panel => {
                  return (
                    <ExpansionPanel square>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{panel}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <ProjectItems items={items} addItem={this.addItem} />
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions>
                        <Button size="small" color="secondary" onClick={this.removePanel}>Remove</Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  )
                })}
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