import { Meteor } from 'meteor/meteor';
import '../imports/api/eshops';
import '../imports/api/projects';

Meteor.startup(() => {
  // code to run on server at startup
});

/* WebApp.connectHandlers.use('/auto-update', (req, res) => {
  run((err, data) => {
    if (err) throw err
    res.writeHead(200);
    res.end(JSON.stringify(data));
  })
}); */
