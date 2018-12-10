import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Meteor.publish('products', function productsPublication() {
    return Products.find();
  });
  Meteor.publish('product', function productPublication(_id) {
    return Products.find({ _id });
  });
}

Meteor.methods({
  'products.remove'(id) {
    Products.remove(id);
  }
})