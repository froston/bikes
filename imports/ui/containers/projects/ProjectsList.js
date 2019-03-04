import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import { debounce } from '../../utils/funcs'
import { Projects } from '../../../api/projects';
import { Table, FilterProjects } from '../../components'

const tableConfig = new ReactiveVar({
  filters: null,
  searchValue: null,
});

class ProjectsList extends React.Component {
  rows = [
    { id: 'name', label: 'Název' },
    { id: 'status', label: 'Status objednávky' },
    { id: 'totalPrice', label: 'Celková cena', render: price => `${price} Kč` },
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

  componentDidMount() {
    this.setConfig('filters', null)
  }

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

  handleFilter = filters => {
    this.setConfig('filters', filters)
  }

  handleSearch = debounce(searchValue => {
    this.setConfig('searchValue', searchValue)
  }, 400)

  setConfig = (name, value) => {
    const config = this.props.tableConfig.get();
    config[name] = value;
    this.props.tableConfig.set(config);
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
        handleSearch={e => this.handleSearch(e.target.value)}
        filter={<FilterProjects handleFilter={this.handleFilter} />}
      />
    );
  }
}

export default withTracker(() => {
  const config = tableConfig.get();
  const handle = Meteor.subscribe('projects', config.filters, config.searchValue)
  return {
    data: Projects.find({}, { sort: { _id: 1 } }).fetch(),
    ready: handle.ready(),
    tableConfig
  };
})(ProjectsList);
