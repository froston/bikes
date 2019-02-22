import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/api/products';
import '../imports/api/eshops';
import '../imports/api/projects';

Meteor.startup(() => {
  // code to run on server at startup
  Products.rawCollection().createIndex({
    category: 1,
  });
  Products.rawCollection().createIndex({
    name: "text",
  });
});