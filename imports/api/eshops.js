import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Eshops = new Mongo.Collection('eshops');

if (Meteor.isServer) {
  Meteor.publish('eshops', function eshopsPublication() {
    return Eshops.find();
  });
  Meteor.publish('eshop', function eshopPublication(_id) {
    return Eshops.findOne({ _id });
  });
}

const checkEshop = (eshop) => {
  check(eshop.name, String);
  check(eshop.url, String);
  check(eshop.autoUpdate, Boolean);
}

Meteor.methods({
  'eshops.save'(eshop) {
    check(eshop.name, String);
    check(eshop.url, String);
    check(eshop.autoUpdate, Boolean);
    // check if updating or inserting
    if (eshop._id) {
      check(eshop._id, String);
      console.log(eshop)
      Eshops.update(eshop._id, {
        name: eshop.eshop,
        url: eshop.url,
        autoUpdate: eshop.autoUpdate,
        attributes: {
          item: eshop.item,
          id: eshop.id,
          name: eshop.name,
          ean: eshop.ean,
          producer: eshop.producer,
          price_vo: eshop.price_vo,
          price_mo: eshop.price_mo,
          amount: eshop.amount,
          photo: eshop.photo,
          category: eshop.category,
          delimiter: eshop.delimiter,
          unit: eshop.unit,
        },
        lastUpdate: new Date(),
      });
    } else {
      Eshops.insert({
        name: eshop.eshop,
        url: eshop.url,
        autoUpdate: eshop.autoUpdate,
        attributes: {
          item: eshop.item,
          id: eshop.id,
          name: eshop.name,
          ean: eshop.ean,
          producer: eshop.producer,
          price_vo: eshop.price_vo,
          price_mo: eshop.price_mo,
          amount: eshop.amount,
          photo: eshop.photo,
          category: eshop.category,
          delimiter: eshop.delimiter,
          unit: eshop.unit,
        },
        createdAt: new Date(),
        lastUpdate: new Date(),
      });
    }
  },
  'eshops.remove'(id) {
    Eshops.remove(id);
  }
})