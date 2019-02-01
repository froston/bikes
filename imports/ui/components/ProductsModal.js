import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { ProductsList } from '../containers';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProductsModal extends React.Component {
  render() {
    const { open, handleClose, handleClick } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ProductsList handleClick={handleClick} />
      </Dialog>
    );
  }
}

ProductsModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ProductsModal;