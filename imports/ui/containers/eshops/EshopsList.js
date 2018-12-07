import React from 'react';
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { Eshops } from '../../../api/eshops';
import { Table } from '../../components'
import UpdateIcon from '@material-ui/icons/Update';
import moment from 'moment'

class EshopsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název eshopu' },
    { id: 'date', label: 'Datum vytvoření', render: date => moment(date).format("DD.MM.YYYY") },
    { id: 'lastUpdate', label: 'Posledni aktualizace', render: date => moment(date).format("DD.MM.YYYY") },
    { id: 'autoUpdate', label: 'Aktualizovat automaticky', render: (text) => text ? <UpdateIcon /> : null },
  ];

  handleCreate = () => {
    const { match, history } = this.props
    history.push(`${match.url}/novy`)
  }
  handleRemove = ids => {
    ids.forEach(id => Meteor.call('eshops.remove', id))
  }
  handleEdit = (id) => {
    const { match, history } = this.props
    history.push(`${match.url}/${id}`)
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Table
          rowKey="_id"
          title="Seznam Eshopů"
          rows={this.rows}
          data={data}
          handleCreate={this.handleCreate}
          handleRemove={this.handleRemove}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('eshops');
  return {
    data: Eshops.find({}).fetch(),
  };
})(withRouter(EshopsList))
