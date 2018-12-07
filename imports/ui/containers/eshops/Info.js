import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  }
})

class Info extends React.Component {
  render() {
    const { classes, handleChange, handleCheck, values } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <TextField
            label="Nazev e-shopu"
            className={classes.textField}
            value={values.eshop}
            onChange={handleChange('eshop')}
            margin="normal"
          />
        </div>
        <div className={classes.container}>
          <TextField
            label="Odkaz k XML zdroji"
            className={classes.textField}
            value={values.url}
            onChange={handleChange('url')}
            margin="normal"
          />
        </div>
        <br />
        <FormGroup row>
          <FormControlLabel control={
            <Checkbox
              checked={values.autoUpdate}
              onChange={handleCheck('autoUpdate')}
              value="autoUpdate"
              color="primary"
            />
          }
            label="Automaticky update"
          />
        </FormGroup>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);