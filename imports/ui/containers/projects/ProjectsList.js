import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../../api/projects';
import { Table } from '../../components'

class ProjectsList extends React.Component {
  rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Název' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Datum vytvoření' },
    { id: 'completed', numeric: true, disablePadding: false, label: 'Objednáno' },
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
    const { data } = this.props;
    return (
      <Table
        title="Seznam Projektu"
        rows={this.rows}
        data={data}
        handleCreate={this.handleCreate}
        handleRemove={this.handleRemove}
        handleEdit={this.handleEdit}
      />
    );
  }
}

export default withTracker(() => {
  return {
    data: Projects.find({}).fetch(),
  };
})(ProjectsList);
