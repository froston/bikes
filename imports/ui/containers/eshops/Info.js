import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    const { classes, handleChange, values } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <TextField
            label="Nazev e-shopu"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
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
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);