import React from 'react';
import ProductsList from './ProductsList'

class ProductsContainer extends React.Component {
  state = {
    searchValue: null
  }
  handleSearch = e => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    const { searchValue } = this.state;
    return (
      <ProductsList
        searchValue={searchValue}
        handleSearch={this.handleSearch}
      />
    );
  }
}

export default ProductsContainer
