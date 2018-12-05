import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Eshops = new Mongo.Collection('eshops');

if (Meteor.isServer) {
  Meteor.publish('eshops', function eshopsPublication() {
    return Eshops.find();
  });
}

Meteor.methods({
  'eshops.insert'(eshop) {
    check(eshop.name, String);
    check(eshop.url, String);

    Eshops.insert({
      name: eshop.name,
      url: eshop.url,
      attributes: {
        id: eshop.id,
        category: eshop.category,
        product: eshop.product,
        price: eshop.price
      },
      createdAt: new Date(),
      lastUpdate: new Date(),
      autoUpdate: true
    });
  },
  'eshops.remove'(id) {
    Eshops.remove(id);
  },
})