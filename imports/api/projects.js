import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function () {
    return Projects.find(condition);
  });
  Meteor.publish('project', function (_id) {
    return Projects.find({ _id });
  });
}

Meteor.methods({
  'projects.remove'(id) {
    Projects.remove(id);
  }
})