import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { StatusSelect } from '../../components'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit,
    width: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class Info extends React.Component {
  render() {
    const { classes, handleChange, values } = this.props
    return (
      <div>
        <div className={classes.container}>
          <TextField
            label="Název projetku"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
        </div>
        <div className={classes.container}>
          <div className={classes.textField}>
            <StatusSelect value={values.status} onChange={(handleChange('status'))} />
          </div>
        </div>
        <div className={classes.container}>
          <TextField
            label="Popis"
            className={classes.textField}
            multiline
            rows="4"
            value={values.description}
            onChange={handleChange('description')}
            margin="normal"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Info);