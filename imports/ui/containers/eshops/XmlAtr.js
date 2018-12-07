import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
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
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item sm={6}>
            <TextField
              label="Položka"
              className={classes.textField}
              value={values.item}
              onChange={handleChange('item')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Id"
              className={classes.textField}
              value={values.id}
              onChange={handleChange('id')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Název položky"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="EAN"
              className={classes.textField}
              value={values.ean}
              onChange={handleChange('ean')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Výrobce"
              className={classes.textField}
              value={values.producer}
              onChange={handleChange('producer')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Kategorie"
              className={classes.textField}
              value={values.category}
              onChange={handleChange('category')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Oddělovač kategorie"
              className={classes.textField}
              value={values.delimiter}
              onChange={handleChange('delimiter')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="VOC Cena"
              className={classes.textField}
              value={values.price_vo}
              onChange={handleChange('price_vo')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="MOC Cena"
              className={classes.textField}
              value={values.price_mo}
              onChange={handleChange('price_mo')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Množství"
              className={classes.textField}
              value={values.amount}
              onChange={handleChange('amount')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Jednotka"
              className={classes.textField}
              value={values.unit}
              onChange={handleChange('unit')}
              margin="normal"
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label="Fotka"
              className={classes.textField}
              value={values.photo}
              onChange={handleChange('photo')}
              margin="normal"
            />
          </Grid>

        </Grid>
      </div>
    );
  }
}

XmlAtr.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(XmlAtr);