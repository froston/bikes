import React from 'react';
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import UpdateIcon from '@material-ui/icons/Update';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Eshops } from '../../../api/eshops';
import { Table } from '../../components'

class EshopsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název eshopu' },
    { id: 'date', label: 'Datum vytvoření', render: date => moment(date).format("DD.MM.YYYY") },
    { id: 'lastUpdate', label: 'Posledni aktualizace', render: date => moment(date).format("DD.MM.YYYY H:mm") },
    { id: 'autoUpdate', label: 'Aktualizovat automaticky', render: (text) => text ? <UpdateIcon /> : null },
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
    Meteor.call('eshops.remove', id)
  }
  handleEdit = eshop => {
    const { match, history } = this.props
    history.push(`${match.url}/${eshop._id}`)
  }

  render() {
    const { data, ready } = this.props;
    return (
      <div>
        <Table
          rowKey="_id"
          title="Seznam Eshopů"
          rows={this.rows}
          data={data}
          ready={ready}
          handleClick={this.handleEdit}
          handleCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('eshops');
  return {
    data: Eshops.find({}, { sort: { _id: 1 } }).fetch(),
    ready: handle.ready(),
  };
})(withRouter(EshopsList))
