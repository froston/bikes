import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/api/products';
import { Projects } from '../imports/api/projects';
import '../imports/api/eshops';

Meteor.startup(() => {
  // code to run on server at startup
  Products.rawCollection().createIndex({
    category: 1,
  });
  Products.rawCollection().createIndex({
    name: "text",
  });
  Projects.rawCollection().createIndex({
    name: "text",
  });
});