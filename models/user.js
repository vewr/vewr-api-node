var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false },
  _videos: [{ type: Schema.Types.ObjectId, ref: 'Video', trim: true }],
  _alphaKey: { type: Schema.Types.ObjectId, ref: 'AlphaKey', trim: true },
}, {
  timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;