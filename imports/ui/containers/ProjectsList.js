import React from 'react';
import { Table } from '../components'

class ProjectsList extends React.Component {
  state = {
    data: []
  };

  rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Název' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Datum vytvoření' },
    { id: 'completed', numeric: true, disablePadding: false, label: 'Objednáno' },
  ];

  render() {
    const { data } = this.state;
    return (
      <Table
        title="Seznam Projektu"
        rows={this.rows}
        data={data}
      />
    );
  }
}

export default ProjectsList;
