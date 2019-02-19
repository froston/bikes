import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
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
  Meteor.methods({
    async 'eshops.update'(_id) {
      const eshop = Eshops.findOne({ _id });
      return await updateEshop(eshop)
    },
  })
  WebApp.connectHandlers.use('/auto-update', async (req, res) => {
    const result = await autoUpdate()
    res.writeHead(200);
    res.end(result);
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
          ignoreFirst: eshop.ignoreFirst
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
          ignoreFirst: eshop.ignoreFirst
        },
        createdAt: new Date(),
        lastUpdate: new Date(),
      });
    }
  },
  'eshops.remove'(id, eshop) {
    Eshops.remove(id);
  }
})