var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  title: { type: String, required: true, trim: true },
  details: { type: String, select: false },
  views: { type: Number, required: true, default: 0, validate : {
    validator: Number.isInteger,
    message: '{VALUE} is not an integer value'
  }},
  ipfsLinks: [{ type: String, trim: true }],
  user: [{ type: Schema.Types.ObjectId, ref: 'User', trim: true }],
}, {
  timestamps: true
});

var Video = mongoose.model('Video', videoSchema);

module.exports = Video;