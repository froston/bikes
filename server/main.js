import { Meteor } from 'meteor/meteor';
import '../imports/api/eshops';
import '../imports/api/projects';
import { run } from './update'

Meteor.startup(() => {
  // code to run on server at startup
});

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/auto-update', (req, res) => {
  run((err, data) => {
    if (err) throw err
    res.writeHead(200);
    res.end(JSON.stringify(data));
  })
});
