import React from 'react';
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Products } from '../../../api/products';
import { Table, FilterProducts, SetColumns } from '../../components'
import { debounce } from '../../utils/funcs'
import { getColumns, setColumns, changeColumns } from '../../utils/storage'

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
  iconSmall: {
    marginRight: theme.spacing.unit,
    fontSize: 20,
  },
})

const tableConfig = new ReactiveVar({
  searchValue: null,
  filters: null,
  page: 0,
  rowsPerPage: 50,
  order: 'asc',
  orderBy: '_id'
});

class ProductList extends React.Component {
  state = {
    columns: {}
  }

  componentDidMount() {
    const columns = getColumns()
    if (!columns) {
      let cols = {}
      this.getRows().forEach(item => {
        if (item.label !== "") {
          cols[item.label] = true
        }
      })
      this.setState({ columns: cols })
      setColumns(cols)
    } else {
      this.setState({ columns })
    }
  }

  getRows = () => {
    const { classes } = this.props
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
            className={classes.avatar}
          />
        )
      },
      { id: 'code', label: 'Kód', visible: columns['Kód'] },
      { id: 'eshop', label: 'Eshop', visible: columns['Eshop'] },
      { id: 'ean', label: 'EAN', visible: columns['EAN'] },
      { id: 'name', label: 'Název', visible: columns['Název'] },
      { id: 'desc', label: 'Popis', visible: columns['Popis'] },
      { id: 'category', label: 'Kategorie', visible: columns['Kategorie'], render: c => c && c.map(cat => <Chip key={cat} label={cat} className={this.props.classes.chip} />) },
      { id: 'price_mo', label: 'MO Cena', visible: columns['MO Cena'], render: c => Math.round(c) },
      { id: 'price_vo', label: 'VO Cena', visible: columns['VO Cena'], render: c => Math.round(c) },
      { id: 'producer', label: 'Výrobce', visible: columns['Výrobce'] },
      { id: 'weight', label: 'Hmotnost', visible: columns['Hmotnost'] },
      { id: 'amount', label: 'Skladem', visible: columns['Skladem'], render: (text, rec) => `${rec.amount} ${rec.unit}` },
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
  }

  handleRemove = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    Meteor.call('products.remove', id)
  }

  handleClick = (item) => {
    if (!!this.props.handleClick) {
      this.resetConfig()
      this.props.handleClick(item)
    } else {
      const { match, history } = this.props
      history.push(`${match.url}/${item._id}`)
    }
  }

  handleSearch = debounce(searchValue => {
    this.setConfig('page', 0)
    this.setConfig('searchValue', searchValue)
  }, 400)

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
    const columns = getColumns()
    columns[name] = value
    this.setState({ columns })
    setColumns(columns)
  }

  setConfig = (name, value) => {
    const config = this.props.tableConfig.get();
    config[name] = value;
    this.props.tableConfig.set(config);
  }

  resetConfig = () => {
    // todo find a way how to set all config as object
    this.setConfig('filters', null)
    this.setConfig('page', 0)
    this.setConfig('rowsPerPage', 10)
    this.setConfig('order', 'asc')
    this.setConfig('orderBy', '_id')
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
        handleSearch={e => this.handleSearch(e.target.value)}
        handlePage={this.handlePage}
        handleRowsPerPage={this.handleRowsPerPage}
        handleSort={this.handleSort}
        handleClick={this.handleClick}
        setColumns={
          <SetColumns
            columns={this.state.columns}
            handleChange={this.handleColumns}
          />}
        filter={<FilterProducts handleFilter={this.handleFilter} />}
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
    data: Products.find({}, {
      skip: config.page * config.rowsPerPage,
      limit: config.rowsPerPage,
      sort: { [config.orderBy]: config.order === 'asc' ? 1 : -1 }
    }).fetch(),
    totalRows: Counts.get('totalRows'),
    ready: handle.ready(),
    tableConfig
  }
})(withStyles(styles)(withRouter(ProductList)));
