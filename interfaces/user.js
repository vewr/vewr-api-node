var User = require('../models/user');

class UserInterface {
  createUser(data) {
    return new User(data).save();
  }

  findUserById(id) {
    return User.findOne({ _id: id }).lean();
  }

  findUserByUsernameIncludePassword(username) {
    return User.findOne({ username }).select('+password').lean();
  }

  findUserByUsername(username) {
    return User.findOne({ username }).lean();
  }

  updateUserById(id, data) {
    return User.findOneAndUpdate({ _id: id }, data, { new: true }).lean();
  }
}

module.exports = new UserInterface;