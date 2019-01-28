import React from 'react';
import ProductsList from './ProductsList'

class ProductsContainer extends React.Component {
  state = {
    searchValue: null,
    filters: null
  }
  handleSearch = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleFilter = (filters) => {
    this.setState({ filters })
  }

  render() {
    const { searchValue, filters } = this.state;
    return (
      <ProductsList
        searchValue={searchValue}
        filters={filters}
        handleSearch={this.handleSearch}
        handleFilter={this.handleFilter}
      />
    );
  }
}

export default ProductsContainer
