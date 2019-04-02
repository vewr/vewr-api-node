var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alphaKeySchema = new Schema({
  key: { type: String, required: true, unique: true, trim: true }
}, {
  timestamps: true
});

var AlphaKey = mongoose.model('AlphaKey', alphaKeySchema);

module.exports = AlphaKey;