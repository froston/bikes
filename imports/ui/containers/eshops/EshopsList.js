import React from 'react';
import { withRouter } from 'react-router-dom'
import { Table } from '../../components'
import UpdateIcon from '@material-ui/icons/Update';

class EshopsList extends React.Component {
  state = {
    data: [
      { id: 1, name: "Test", date: "12-12-2018" },
      { id: 2, name: "Test1", date: "12-12-2018" },
      { id: 3, name: "Test2", date: "12-12-2018" },
      { id: 4, name: "Test3", date: "12-12-2018", autoUpdate: true },
    ]
  };

  rows = [
    { id: 'name', label: 'Název eshopu' },
    { id: 'date', label: 'Datum vytvoření' },
    { id: 'lastUpdate', label: 'Posledni aktualizace' },
    { id: 'autoUpdate', label: 'Aktualizovat automaticky', render: (text) => text ? <UpdateIcon /> : null },
  ];

  handleCreate = () => {
    const { match, history } = this.props
    history.push(`${match.url}/create`)
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Table
          title="Seznam Eshopů"
          rows={this.rows}
          data={data}
          handleCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default withRouter(EshopsList);
