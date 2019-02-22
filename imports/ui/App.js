import React from 'react';
import Layout from './Layout'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Layout} />
      </BrowserRouter>
    );
  }
}

export default App;