import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Meteor.publish('products', function productsPublication() {
    return Products.find();
  });
}