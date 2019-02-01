import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function () {
    return Projects.find({});
  });
  Meteor.publish('project', function (_id) {
    return Projects.find({ _id });
  });
}

Meteor.methods({
  'projects.save'(project) {
    check(project.name, String);
    // check if updating or inserting
    if (project._id) {
      check(project._id, String);
      Projects.update(project._id, {
        name: project.name,
        lastUpdate: new Date(),
      });
    } else {
      Projects.insert({
        name: project.name,
        items: [],
        createdAt: new Date(),
        lastUpdate: new Date(),
      });
    }
  },
  'projects.remove'(id) {
    Projects.remove(id);
  }
})