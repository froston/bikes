import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Products } from '../../../api/products';
import { Table } from '../../components'

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

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
    { id: 'category', label: 'Kategorie', render: c => c.map(cat => <Chip label={cat} className={this.props.classes.chip} />) },
    { id: 'price_mo', label: 'MO Cena' },
    { id: 'price_vo', label: 'VO Cena' },
    { id: 'amount', label: 'Skladem', render: (text, rec) => `${rec.amount} ${rec.unit}` },
  ];

  handleRemove = ids => {
    ids.forEach(id => Meteor.call('products.remove', id))
  }

  handleEdit = (id) => {
    const { match, history } = this.props
    history.push(`${match.url}/${id}`)
  }

  render() {
    const { data } = this.props;
    return (
      <Table
        rowKey="_id"
        title="Seznam Produktů"
        rows={this.rows}
        data={data}
        handleRemove={this.handleRemove}
        handleEdit={this.handleEdit}
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
