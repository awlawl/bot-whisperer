var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(process.env['DOCKER_CUSTOM_IMAGE_NAME']);
});

module.exports = router;
