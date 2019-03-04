import React from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
  grid: {
    flexGrow: 1,
    height: '100%',
    background: 'linear-gradient(to right bottom, #1a237e, #e8eaf6)'
  },
  textField: {
    marginTop: 15,
    width: 300
  }
}

class Login extends React.Component {
  state = {
    password: null,
    error: false
  }

  handleLogin = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (this.state.password === "test") {
        localStorage.setItem('logged', true)
        this.props.history.push('/projekty')
      } else {
        this.setState({ password: null, error: true })
      }
    }
  }

  handleChange = password => {
    this.setState({ password, error: false })
  }

  render() {
    const { classes } = this.props
    const { password, error } = this.state
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item>
          <Typography variant="h4">Vítej v Jakubkolo!</Typography>
          <TextField
            error={error}
            label="Heslo"
            variant="outlined"
            type="password"
            value={password}
            onChange={e => this.handleChange(e.target.value)}
            onKeyPress={this.handleLogin}
            className={classes.textField}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(Login));