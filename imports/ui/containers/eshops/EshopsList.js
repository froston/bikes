import React from 'react';
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import UpdateIcon from '@material-ui/icons/Update';
import moment from 'moment'
import { Eshops } from '../../../api/eshops';
import { Table } from '../../components'

class EshopsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název eshopu' },
    { id: 'date', label: 'Datum vytvoření', render: date => moment(date).format("DD.MM.YYYY") },
    { id: 'lastUpdate', label: 'Posledni aktualizace', render: date => moment(date).format("DD.MM.YYYY H:mm") },
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
    const { data, ready } = this.props;
    return (
      <div>
        <Table
          rowKey="_id"
          title="Seznam Eshopů"
          rows={this.rows}
          data={data}
          ready={ready}
          handleCreate={this.handleCreate}
          handleRemove={this.handleRemove}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('eshops');
  return {
    data: Eshops.find({}).fetch(),
    ready: handle.ready(),
  };
})(withRouter(EshopsList))
