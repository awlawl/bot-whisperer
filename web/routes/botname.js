var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(process.env['AWS_BOT_NAME']);
});

module.exports = router;
