var Video = require('../models/video');

class VideoInterface {
  createVideo(data) {
    return new Video(data).save().lean();
  }

  findVideoById(id) {
    return Video.findOne({ _id: id }).lean();
  }

  findVideoByIPFS(ipfs) {
    return Video.findOne({ ipfsLinks: ipfs }).lean();
  }

  updateVideoById(id, data) {
    return Video.findOneAndUpdate({ _id: id }, data, { new: true }).lean();
  }
}

module.exports = new VideoInterface;