import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Parts = new Mongo.Collection('parts');

if (Meteor.isServer) {
  Meteor.publish('parts', function () {
    return Parts.find({});
  });
}

Meteor.methods({
  'parts.save'(part) {
    check(part.name, String);
    Parts.insert({
      name: part.name,
    });
  },
  'parts.remove'(id) {
    Parts.remove(id);
  }
})