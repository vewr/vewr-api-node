var express = require('express');
var videoRoute = express.Router();
var VideoInterface = require('../interfaces/video');
var ResponseHelper = require('../helpers/ResponseHelper');

videoRoute.post('/', (request, response) => {
  VideoInterface.createVideo(request.body)
  .then((video) => {
    video = video._doc; // lean the video

    response.json(ResponseHelper.success(video));
  })
  .catch((err) => response.json(ResponseHelper.error(err)));
});

videoRoute.get('/:id', (request, response) => {
  VideoInterface.findVideoById(request.params.id)
  .then((video) => response.json(ResponseHelper.success(video)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

videoRoute.put('/:id', (request, response) => {
  VideoInterface.updateVideoById(request.params.id, request.body)
  .then((video) => response.json(ResponseHelper.success(video)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

videoRoute.get('/ipfs/:ipfs', (request, response) => {
  VideoInterface.findVideoByIPFS(request.params.ipfs)
  .then((video) => response.json(ResponseHelper.success(video)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

videoRoute.get('/increment/:id', (request, response) => {
  VideoInterface.updateVideoById(request.params.id, { $inc: { 'views': 1 } })
  .then((video) => response.json(ResponseHelper.success(video)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

module.exports = videoRoute;