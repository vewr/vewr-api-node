const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const auth = require('./auth')();

const serverPort = 8095;

const server = express();

// TODO: update with actual mongo credentials once we get the server up
var mongoConfig = {
  authSource: 'admin',
  username: 'vewr_api',
  password: 'WXcqf5sCXwrkomSa',
  replicaSet: 'vewr0-shard-0',
  replicas: [
    'vewr0-shard-00-00-8fnqd.mongodb.net:27017',
    'vewr0-shard-00-01-8fnqd.mongodb.net:27017',
    'vewr0-shard-00-02-8fnqd.mongodb.net:27017'
  ],
  database: 'vewr_dev',
  ssl: true
};

server.use(bodyParser.json());
// initalize our authentication strategy
server.use(auth.init());

// enable mongoose promises
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.replicas.join(',')}/${mongoConfig.database}?ssl=${mongoConfig.ssl}&replicaSet=${mongoConfig.replicaSet}&authSource=${mongoConfig.authSource}`, { useNewUrlParser: true })
  .then(() => console.log(`connection to dev database successful`))
  .catch(err => console.error(err));

server.use('/alphaKey', routes.alphaKey);
server.use('/user', routes.user);
server.use('/video', routes.video);

server.listen(serverPort, () => console.log(`Vewr API is running on: ${serverPort}`));