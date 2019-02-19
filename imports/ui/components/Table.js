import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TableToolbar, TableHead } from './'

const styles = theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
  },
  iconSmall: {
    marginRight: theme.spacing.unit,
    fontSize: 20,
  },
  progress: {
    flexGrow: 1,
  },
});

class EnhancedTable extends React.Component {
  state = {
    selected: null,
  };

  handleClick = (e, rec) => {
    this.setState({ selected: rec._id !== this.state.selected ? rec._id : null });
    if (this.props.handleClick) {
      this.props.handleClick(rec)
    }
  };

  render() {
    const { classes, rows, data, title } = this.props;
    const { selected } = this.state;
    return (
      <Paper square className={classes.root}>
        {title &&
          <TableToolbar
            title={title}
            handleCreate={this.props.handleCreate}
            handleSearch={this.props.handleSearch}
            setColumns={this.props.setColumns}
            filter={this.props.filter}
          />
        }
        <div className={classes.tableWrapper}>
          {!this.props.ready &&
            <div className={classes.progress}>
              <LinearProgress />
            </div>
          }
          <Table className={classes.table}>
            <TableHead
              rows={rows}
              order={this.props.order}
              orderBy={this.props.orderBy}
              onRequestSort={this.props.handleSort}
            />
            <TableBody>
              {data.map((n, index) => {
                return (
                  <TableRow
                    hover
                    className={classes.tableRow}
                    key={n._id}
                    onClick={event => this.handleClick(event, n)}
                    tabIndex={-1}
                    selected={selected == n._id}
                  >
                    {rows.map(row => {
                      const text = row && row.render ? row.render(n[row.id], n, index) : String(n[row.id])
                      return row.visible !== false && <TableCell key={row.id}>{text}</TableCell>
                    })}
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
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  ready: PropTypes.bool,
  page: PropTypes.number,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  rowsPerPage: PropTypes.number,
  handleClick: PropTypes.func,
  handleCreate: PropTypes.func,
  handleFilter: PropTypes.func,
  handleSort: PropTypes.func,
  handleSearch: PropTypes.func,
  handlePage: PropTypes.func,
  handleRowsPerPage: PropTypes.func,
  filter: PropTypes.any,
};

EnhancedTable.defaultProps = {
  ready: true
}

export default withStyles(styles)(EnhancedTable);
