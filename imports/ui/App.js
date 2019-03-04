import React from 'react';
import Layout from './Layout'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './containers'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogged = localStorage.getItem('logged')
  return (
    <Route
      {...rest}
      render={props => isLogged ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}

export default App;