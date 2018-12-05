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
  }
})

class XmlAtr extends React.Component {
  render() {
    const { classes, handleChange, values } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <TextField
            label="Id"
            className={classes.textField}
            value={values.id}
            onChange={handleChange('id')}
            margin="normal"
          />
        </div>
        <div className={classes.container}>
          <TextField
            label="Produkt"
            className={classes.textField}
            value={values.product}
            onChange={handleChange('product')}
            margin="normal"
          />
        </div>

        <div className={classes.container}>
          <TextField
            label="Kategorie"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            margin="normal"
          />
        </div>
        <div className={classes.container}>
          <TextField
            label="Cena"
            className={classes.textField}
            value={values.price}
            onChange={handleChange('price')}
            margin="normal"
          />
        </div>
      </div>
    );
  }
}

XmlAtr.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(XmlAtr);