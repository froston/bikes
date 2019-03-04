import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ClearIcon from '@material-ui/icons/Clear';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { getItemTypes, removeItemType } from '../utils/storage'

const styles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  }
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

class ItemTypes extends React.Component {
  state = {
    item: this.props.value,
    suggestions: getItemTypes(),
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getItemTypes(),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  handleRemoveItem = (e, s) => {
    e.preventDefault()
    e.stopPropagation()
    removeItemType(s)
    this.setState({ suggestions: getItemTypes() })
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({ [name]: newValue });
    this.props.handleChange(newValue)
  };

  renderSuggestion = (s, { isHighlighted }) => (
    <MenuItem component="div">
      <ListItemText primary={s} />
      {isHighlighted &&
        <ListItemIcon style={{ marginRight: 0 }}>
          <IconButton onClick={e => this.handleRemoveItem(e, s)} >
            <ClearIcon />
          </IconButton >
        </ListItemIcon>
      }
    </MenuItem>
  )

  render() {
    const { classes } = this.props;
    const autosuggestProps = {
      renderInputComponent,
      renderSuggestion: this.renderSuggestion,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: v => v,
      shouldRenderSuggestions: () => true
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'Druh dílu',
          placeholder: 'Druh dílu',
          value: this.props.value,
          onChange: this.handleChange('item'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

ItemTypes.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ItemTypes);
