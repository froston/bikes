import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class Info extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            FORM
            </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" size="large" color="primary" className={classes.button}>
            <SaveIcon className={classes.leftIcon} />
            SAVE
            </Button>
        </CardActions>
      </Card>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);