var express = require('express');
var alphaKeyRoute = express.Router();
var AlphaKeyInterface = require('../interfaces/alphaKey');
var ResponseHelper = require('../helpers/ResponseHelper');
var auth = require('../auth')();

alphaKeyRoute.get('/', auth.authenticate(), (request, response) => {
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

// NOTE: In the future, we may want to persist alphaKeys and 
// add a boolean field for "active" that we can set to true or false

alphaKeyRoute.delete('/:key', auth.authenticate(), (request, response) => {
  AlphaKeyInterface.deleteAlphaKeyById(request.params.key)
  .then((alphaKey) => response.json(ResponseHelper.success(alphaKey)))
  .catch((err) => response.json(ResponseHelper.error(err)));
});

module.exports = alphaKeyRoute;