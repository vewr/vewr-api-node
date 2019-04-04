var express = require('express');
var userRoute = express.Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var UserInterface = require('../interfaces/user');
var ResponseHelper = require('../helpers/ResponseHelper');
var auth = require('../auth')();
var jwt = require('jwt-simple');

const saltRounds = 12;

function encryptPassword(password, rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, rounds, (err, hash) => {
      if (!_.isUndefined(err)) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

userRoute.post('/', (request, response) => {
  encryptPassword(request.body.password, saltRounds)
  .then((hash) => {
    request.body.password = hash;

    return UserInterface.createUser(request.body)
  })
  .then((user) => {
    // strip the excess object off since we can't lean on a save and delete the password field
    user = user._doc;
    user.password = null;
    delete user.password;

    const token = jwt.encode({
      id: user._id
    }, auth.secret);

    response.json(ResponseHelper.success({ user, token }));
  })
  .catch((err) => response.json(ResponseHelper.error(err)));
});

userRoute.get('/:userId', (request, response) => {
  UserInterface.findUserById(request.params.userId)
  .then((user) => response.json(ResponseHelper.success(user)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

userRoute.put('/:userId', auth.authenticate(), (request, response) => {
  UserInterface.updateUserById(request.params.userId, request.body)
  .then((user) => response.json(ResponseHelper.success(user)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

userRoute.post('/login', (request, response) => {
  UserInterface.findUserByUsernameIncludePassword(request.body.username)
  .then((user) => {
    return bcrypt.compare(request.body.password, user.password)
  })
  .then((isCorrectPassword) => {
    if (isCorrectPassword) {
      // re-lookup the user so there's no risk of the password being added
      return UserInterface.findUserByUsername(request.body.username);
    } else {
      response.json(ResponseHelper.error({ message: 'Incorrect Password' }));
    }
  })
  .then((user) => {
    const token = jwt.encode({
      id: user._id
    }, auth.secret);

    response.json(ResponseHelper.success({ user, token }));
  })
  .catch((err) => response.json(ResponseHelper.error(err)));
});

module.exports = userRoute;