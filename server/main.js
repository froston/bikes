import { Meteor } from 'meteor/meteor';
import '../imports/api/eshops';
import '../imports/api/projects';

Meteor.startup(() => {
  // code to run on server at startup
});

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/auto-update', (req, res, next) => {
  res.writeHead(200);
  res.end(`Hello world from: ${Meteor.release}`);
});
