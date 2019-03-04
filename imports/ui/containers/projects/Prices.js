import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  price: {
    margin: 10
  }
})

class Prices extends React.Component {
  render() {
    const { classes, calcPrices, handleChange, values } = this.props
    const prices = calcPrices()
    return (
      <div className={classes.root}>
        <Grid container spacing={40}>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.paper}>
              <TextField
                label="Marže"
                type="number"
                className={classes.textField}
                value={values.gross}
                onChange={handleChange('gross')}
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
              <TextField
                label="Poštovné"
                type="number"
                className={classes.textField}
                value={values.postage}
                onChange={handleChange('postage')}
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Kč</InputAdornment>,
                }}
              />
              <TextField
                label="Poplatky"
                type="number"
                className={classes.textField}
                value={values.fees}
                onChange={handleChange('fees')}
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Kč</InputAdornment>,
                }}
              />
            </Paper>
          </Grid>
          <Grid item sm={8} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5" className={classes.price} gutterBottom>
                Cena za materiál: {prices.netPrice} Kč
              </Typography>
              <Typography variant="h5" className={classes.price} gutterBottom>
                Marže: {prices.grossCount} Kč
              </Typography>
              <Typography variant="h5" className={classes.price} gutterBottom>
                Cena s marží: {prices.grossPrice} Kč
              </Typography>
              <br />
              <Typography variant="h5" className={classes.price} gutterBottom>
                <b>Celková cena: {prices.totalPrice} Kč</b>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(Prices);