import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import BallIcon from '@material-ui/icons/TripOrigin';

const styles = theme => ({
  formControl: {
    width: '100%',
  },
  icon: {
    marginRight: 10
  }
});

const orderStatuses = [
  { value: 'Nová', color: '#3f51b5' },
  { value: 'Přijatá', color: '#03a9f4' },
  { value: 'Zpracovává se', color: '#ff9800' },
  { value: 'Vyřízená', color: '#4caf50' },
  { value: 'Zrušená', color: '#f44336' },
]

const StatusSelect = ({ classes, value, onChange }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="status">
      Stav objednávky
    </InputLabel>
    <Select
      value={value}
      onChange={onChange}
      renderValue={v => v}
    >
      {orderStatuses.map(o => (
        <MenuItem key={o.value} value={o.value}>
          <BallIcon className={classes.icon} style={{ color: o.color }} />{o.value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

StatusSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(StatusSelect)

