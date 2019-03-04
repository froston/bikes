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
    background: 'linear-gradient(to right bottom, #1a237e, #e91e63)'
  },
  title: {
    color: 'white'
  },
  textField: {
    marginTop: 25,
    width: 300
  },
  cssLabel: {
    '&$cssFocused': {
      color: 'white',
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'white',
    },
  },
  notchedOutline: {
    borderColor: 'white',
  },
}

class Login extends React.Component {
  state = {
    password: '',
    error: false
  }

  handleLogin = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (this.state.password === "test") {
        localStorage.setItem('logged', true)
        this.props.history.push('/projekty')
      } else {
        this.setState({ password: '', error: true })
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
          <Typography variant="h4" className={classes.title}>
            Vítej v Jakubkolo!
          </Typography>
          <form noValidate>
            <TextField
              error={error}
              label="Heslo"
              variant="outlined"
              type="password"
              value={password}
              onChange={e => this.handleChange(e.target.value)}
              onKeyPress={this.handleLogin}
              className={classes.textField}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(Login));