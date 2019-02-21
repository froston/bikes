import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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

function getItemTypes() {
  return JSON.parse(localStorage.getItem('itemTypes')) || []
}

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
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({ [name]: newValue });
    this.props.handleChange(newValue)
  };

  render() {
    const { classes } = this.props;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: v => v,
      renderSuggestion: s => <MenuItem component="div">{s}</MenuItem>,
      shouldRenderSuggestions: () => true
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'Druh dílu',
          placeholder: 'Druh dílu',
          value: this.state.item,
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
};

export default withStyles(styles)(ItemTypes);
