var express = require('express');
var alphaKeyRoute = express.Router();
var AlphaKeyInterface = require('../interfaces/alphaKey');
var ResponseHelper = require('../helpers/ResponseHelper');

alphaKeyRoute.post('/', (request, response) => {
  AlphaKeyInterface.createAlphaKey()
  .then((alphaKey) => {
    alphaKey = alphaKey._doc; // lean the alphaKey

    response.json(ResponseHelper.success(alphaKey));
  })
  .catch((err) => response.json(ResponseHelper.error(err)));
});

alphaKeyRoute.get('/:key', (request, response) => {
  AlphaKeyInterface.findAlphaKeyByKey(request.params.key)
  .then((alphaKey) => response.json(ResponseHelper.success(alphaKey)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

alphaKeyRoute.delete('/:key', (request, response) => {
  AlphaKeyInterface.findAlphaKeyByKey(request.params.key)
  .then((alphaKey) => response.json(ResponseHelper.success(alphaKey)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

module.exports = alphaKeyRoute;