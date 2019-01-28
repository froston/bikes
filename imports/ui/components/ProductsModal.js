import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ProductsModal extends React.Component {
  render() {
    const { classes, open, handleClose } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Text in a modal
            </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </div>
      </Modal>
    );
  }
}

ProductsModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsModal);