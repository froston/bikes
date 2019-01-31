import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment'
import { Projects } from '../../../api/projects';
import { Table } from '../../components'

class ProjectsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název' },
    { id: 'date', label: 'Datum vytvoření', render: date => moment(date).format("DD.MM.YYYY") },
  ];
  handleCreate = () => {
    const { match, history } = this.props
    history.push(`${match.url}/novy`)
  }
  handleRemove = ids => {
    ids.forEach(id => Meteor.call('projects.remove', id))
  }
  handleEdit = (id) => {
    const { match, history } = this.props
    history.push(`${match.url}/${id}`)
  }
  render() {
    const { data, ready } = this.props;
    return (
      <Table
        title="Seznam Projektu"
        rows={this.rows}
        data={data}
        ready={ready}
        handleCreate={this.handleCreate}
        handleRemove={this.handleRemove}
        handleEdit={this.handleEdit}
      />
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('projects')
  return {
    data: Projects.find({}).fetch(),
    ready: handle.ready(),
  };
})(ProjectsList);
