const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const serverPort = 8095;

const server = express();

// TODO: update with actual mongo credentials once we get the server up
var mongoConfig = {
  ip: '127.2.2.1',
  port: '27017',
  database: 'vewr_dev'
};

server.use(bodyParser.json());
// enable mongoose promises
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${mongoConfig.ip}:${mongoConfig.port}/${mongoConfig.database}`, { useNewUrlParser: true })
  .then(() => console.log(`connection to test database successful`))
  .catch((err) => console.error(err));

server.use('/alphaKey', routes.alphaKey);
server.use('/user', routes.user);

server.listen(serverPort, () => console.log(`Vewr API is running on: ${serverPort}`));