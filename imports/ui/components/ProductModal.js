import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { ProductDetail } from '../containers';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const Transition = props => {
  return <Slide direction="up" {...props} />;
}

class ProductModal extends React.PureComponent {
  render() {
    const { classes, id, open, handleClick, handleClose } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Náhled produktu
            </Typography>
          </Toolbar>
        </AppBar>
        <ProductDetail id={id} handleClick={handleClick} handleClose={handleClose} />
      </Dialog>
    );
  }
}

ProductModal.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  open: PropTypes.bool,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
};

export default withStyles(styles)(ProductModal);