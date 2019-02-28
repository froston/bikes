import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import { Projects } from '../../../api/projects';
import { Table } from '../../components'

class ProjectsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název' },
    { id: 'totalPrice', label: 'Celková cena', render: price => `${price} Kč` },
    { id: 'status', label: 'Status objednávky' },
    { id: 'date', label: 'Datum vytvoření', render: date => moment(date).format("DD.MM.YYYY") },
    {
      id: 'actions', label: '', render: (text, rec) => {
        return (
          <IconButton onClick={e => this.handleRemove(e, rec._id)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    }
  ];
  handleCreate = () => {
    const { match, history } = this.props
    history.push(`${match.url}/novy`)
  }
  handleRemove = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    Meteor.call('projects.remove', id)
  }
  handleEdit = project => {
    const { match, history } = this.props
    history.push(`${match.url}/${project._id}`)
  }
  render() {
    const { data, ready } = this.props;
    return (
      <Table
        title="Seznam Projektů"
        rows={this.rows}
        data={data}
        ready={ready}
        handleClick={this.handleEdit}
        handleCreate={this.handleCreate}
        handleRemove={this.handleRemove}
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
