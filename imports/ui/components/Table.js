import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TableToolbar, TableHead } from './'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  progress: {
    flexGrow: 1,
  },
});

class EnhancedTable extends React.Component {
  state = {
    selected: [],
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({ selected: this.props.data.map(n => n._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (e, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleRemove = () => {
    this.props.handleRemove(this.state.selected)
    this.setState({ selected: [] });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { rowKey, classes, rows, data, title } = this.props;
    const { selected } = this.state;
    return (
      <Paper square className={classes.root}>
        <TableToolbar
          title={title}
          numSelected={selected.length}
          handleCreate={this.props.handleCreate}
          handleRemove={this.handleRemove}
          handleSearch={this.props.handleSearch}
          setColumns={this.props.setColumns}
          filter={this.props.filter}
        />
        <div className={classes.tableWrapper}>
          {!this.props.ready &&
            <div className={classes.progress}>
              <LinearProgress />
            </div>
          }
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              rows={rows}
              numSelected={selected.length}
              order={this.props.order}
              orderBy={this.props.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.props.handleSort}
              rowCount={this.props.totalRows}
            />
            <TableBody>
              {data.map(n => {
                const isSelected = this.isSelected(n[rowKey]);
                return (
                  <TableRow
                    hover
                    key={n[rowKey]}
                    onClick={event => this.handleClick(event, n[rowKey])}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    {rows.map(row => {
                      const text = row && row.render ? row.render(n[row.id], n) : String(n[row.id])
                      return row.visible !== false && <TableCell key={row.id}>{text}</TableCell>
                    })}
                    <TableCell>
                      <Button label="Edit" onClick={() => this.props.handleEdit(n[rowKey])}>
                        <EditIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Upravit
                        </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {this.props.handlePage &&
          <TablePagination
            component="div"
            count={this.props.totalRows}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            backIconButtonProps={{ 'aria-label': 'Předchozí stránka' }}
            nextIconButtonProps={{ 'aria-label': 'Další stránka' }}
            onChangePage={this.props.handlePage}
            onChangeRowsPerPage={this.props.handleRowsPerPage}
          />
        }
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  rowKey: PropTypes.string,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  ready: PropTypes.bool,
  page: PropTypes.number,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  rowsPerPage: PropTypes.number,
  handleCreate: PropTypes.func,
  handleRemove: PropTypes.func,
  handleEdit: PropTypes.func,
  handleFilter: PropTypes.func,
  handleSort: PropTypes.func,
  handleSearch: PropTypes.func,
  handlePage: PropTypes.func,
  handleRowsPerPage: PropTypes.func,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.any,
};

EnhancedTable.defaultProps = {
  rowKey: '_id'
}

export default withStyles(styles)(EnhancedTable);
