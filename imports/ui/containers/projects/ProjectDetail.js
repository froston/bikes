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
import ClearIcon from '@material-ui/icons/Close'
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
    fontSize: 20
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
    secName: '',
    sections: [],
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
          sections: project.sections || []
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    Meteor.call('projects.save', this.state);
    this.props.history.push('/projekty')
  }

  handleDelete = () => {
    Meteor.call('projects.remove', this.state._id, () => {
      this.props.history.push('/projekty')
    });
  }

  changeTab = (e, tab) => this.setState({ tab })

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addSection = () => {
    const { secName } = this.state
    this.setState({
      sections: [...this.state.sections, secName],
      secName: ''
    })
  }

  removeSection = sec => {
    const sections = this.state.sections.filter(s => s !== sec)
    const items = this.state.items.filter(i => i.section !== sec)
    this.setState({ sections, items })
  }

  addItem = (section, item) => {
    const newItem = {
      ...item,
      section
    }
    this.setState({ items: this.state.items.concat(newItem) })
  }

  removeItem = (section, id) => {
    const items = this.state.items.filter(i => i.section === section && i._id !== id)
    this.setState({ items })
  }

  render() {
    const { classes } = this.props
    const { tab, name, description, items, sections } = this.state
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
                  className={classes.textField}
                  style={{ margin: '20px 0' }}
                  value={this.state.secName}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      this.addSection()
                    }
                  }}
                  onChange={this.handleChange('secName')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Přidat panel"
                          onClick={this.addSection}
                        >
                          <AddBoxIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {sections.map(sec => {
                  return (
                    <ExpansionPanel key="sec" square>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{sec}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <ProjectItems
                          items={items.filter(i => i.section === sec)}
                          addItem={item => this.addItem(sec, item)}
                          removeItem={id => this.removeItem(sec, id)}
                        />
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions>
                        <Button size="small" color="secondary" onClick={() => this.removeSection(sec)}>Smazat sekci</Button>
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
              onClick={this.handleDelete}
              className={classes.button}
              color="secondary"
            >
              <ClearIcon className={classes.leftIcon} />
              Smazat
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}


export default withStyles(styles)(withRouter(ProjectDetail));