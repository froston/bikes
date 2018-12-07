import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Products } from '../../api/products';
import { Table } from '../components'

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

class ProductList extends React.Component {
  rows = [
    {
      id: 'photo', label: 'Náhled', render: photo => (
        <Avatar
          alt="Foto produktu"
          src={photo}
          className={this.props.classes.avatar}
        />
      )
    },
    { id: 'name', label: 'Název' },
    { id: 'category', label: 'Kategorie' },
    { id: 'price_mo', label: 'MO Cena' },
    { id: 'price_vo', label: 'VO Cena' },
    { id: 'amount', label: 'Skladem', render: (text, rec) => `${rec.amount} ${rec.unit}` },
  ];
  render() {
    const { data } = this.props;
    return (
      <Table
        title="Seznam Produktů"
        rows={this.rows}
        data={data}
      />
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('products');
  return {
    data: Products.find({}).fetch(),
  };
})(withStyles(styles)(ProductList));
