import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { autoUpdate, updateEshop } from './updater'

export const Eshops = new Mongo.Collection('eshops');

if (Meteor.isServer) {
  Meteor.publish('eshops', function eshopsPublication() {
    return Eshops.find();
  });
  Meteor.publish('eshop', function eshopPublication(_id) {
    return Eshops.find({ _id });
  });
}

Meteor.methods({
  'eshops.save'(eshop) {
    check(eshop.name, String);
    check(eshop.url, String);
    check(eshop.autoUpdate, Boolean);
    // check if updating or inserting
    if (eshop._id) {
      check(eshop._id, String);
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
  'eshops.update'(_id) {
    const eshop = Eshops.findOne({ _id });
    updateEshop(eshop)
  },
  'eshops.autoUpdate'() {
    autoUpdate()
  },
  'eshops.remove'(id) {
    Eshops.remove(id);
  }
})