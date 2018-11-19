import React from 'react';
import { Link, Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Info from './Info'

class CreateEshop extends React.Component {
  render() {
    const { match, location } = this.props
    console.log(location.pathname)
    console.log(`${match.url}`)
    return (
      <Paper square>
        <Tabs
          fullWidth
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
        >
          <Link to={`${match.url}`}><Tab label="Info" value={`${match.url}`} /></Link>
          <Link to={`${match.url}/xml`}><Tab label="XML Atributy" value={`${match.url}/xml`} /></Link>
        </Tabs>
        <Route exact path={`${match.url}`} component={Info} />
        <Route exact path={`${match.url}/xml`} component={Info} />
      </Paper >
    );
  }
}

export default CreateEshop;