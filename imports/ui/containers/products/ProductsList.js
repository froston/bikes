import React from 'react';
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Products } from '../../../api/products';
import { Table, Filter, SetColumns } from '../../components'

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

const tableConfig = new ReactiveVar({
  searchValue: null,
  filters: null,
  page: 0,
  rowsPerPage: 10,
  order: 'asc',
  orderBy: '_id'
});

class ProductList extends React.Component {
  state = {
    columns: {}
  }


  componentDidMount() {
    this.setState({ columns: { 'Náhled': true, 'Název': true } })
  }

  getRows = () => {
    const { columns } = this.state
    return [
      {
        id: 'photo',
        label: 'Náhled',
        visible: columns['Náhled'],
        render: photo => (
          <Avatar
            alt="Foto produktu"
            src={photo}
            className={this.props.classes.avatar}
          />
        )
      },
      { id: 'name', label: 'Název', visible: columns['Název'] },
      { id: 'category', label: 'Kategorie', render: c => c.map(cat => <Chip key={cat} label={cat} className={this.props.classes.chip} />) },
      { id: 'price_mo', label: 'MO Cena' },
      { id: 'price_vo', label: 'VO Cena' },
      { id: 'amount', label: 'Skladem', render: (text, rec) => `${rec.amount} ${rec.unit}` },
    ];
  }

  handleRemove = ids => {
    ids.forEach(id => Meteor.call('products.remove', id))
  }

  handleEdit = (id) => {
    const { match, history } = this.props
    history.push(`${match.url}/${id}`)
  }

  handleSearch = e => {
    this.setConfig('page', 0)
    this.setConfig('searchValue', e.target.value)
  }

  handleFilter = filters => {
    this.setConfig('page', 0)
    this.setConfig('filters', filters)
  }

  handleSort = (e, property) => {
    const config = tableConfig.get()
    const orderBy = property;
    let order = 'desc';
    if (config.orderBy === property && config.order === 'desc') {
      order = 'asc';
    }
    this.setConfig('order', order)
    this.setConfig('orderBy', orderBy)
  };

  handlePage = (e, page) => this.setConfig('page', page)

  handleRowsPerPage = e => this.setConfig('rowsPerPage', e.target.value)

  handleColumns = (name, value) => {
    const columns = Object.assign({}, this.state.columns)
    columns[name] = value
    this.setState({ columns })
  }

  setConfig = (name, value) => {
    const config = this.props.tableConfig.get();
    config[name] = value;
    this.props.tableConfig.set(config);
  }

  render() {
    const { data, ready, tableConfig, totalRows } = this.props;
    const config = tableConfig.get()
    return (
      <Table
        rowKey="_id"
        title="Seznam Produktů"
        rows={this.getRows()}
        data={data}
        ready={ready}
        page={config.page}
        order={config.order}
        orderBy={config.orderBy}
        rowsPerPage={config.rowsPerPage}
        totalRows={totalRows}
        handleRemove={this.handleRemove}
        handleEdit={this.handleEdit}
        handleSearch={this.handleSearch}
        handlePage={this.handlePage}
        handleRowsPerPage={this.handleRowsPerPage}
        handleSort={this.handleSort}
        setColumns={
          <SetColumns
            columns={this.state.columns}
            handleChange={this.handleColumns}
          />}
        filter={<Filter handleFilter={this.handleFilter} />}
      />
    );
  }
}

export default withTracker(() => {
  const config = tableConfig.get();
  const handle = Meteor.subscribe('products',
    config.page,
    config.rowsPerPage,
    config.searchValue,
    config.filters,
    config.order,
    config.orderBy
  );
  return {
    data: Products.find({}).fetch(),
    totalRows: Counts.get('totalRows'),
    ready: handle.ready(),
    tableConfig
  }
})(withStyles(styles)(withRouter(ProductList)));
