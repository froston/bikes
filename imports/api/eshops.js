import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Eshops = new Mongo.Collection('eshops');

if (Meteor.isServer) {
  Meteor.publish('eshops', function eshopsPublication() {
    return Eshops.find();
  });
}