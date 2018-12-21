import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Products.rawCollection().createIndex({
    name: "text",
  });
  Meteor.publish('products', function (searchValue) {
    if (!searchValue) {
      return Products.find({});
    }
    return Products.find({ $text: { $search: searchValue } });
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