import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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

const orderStatus = ['Nová', 'Přijatá', 'Zpracovává se', 'Vyřízená', 'Zrušená']

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
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="age-simple">Stav objednávky</InputLabel>
            <Select
              value={values.status}
              onChange={handleChange('status')}
            >
              {orderStatus.map(o => {
                return <MenuItem key={o} value={o}>{o}</MenuItem>
              })}
            </Select>
          </FormControl>
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