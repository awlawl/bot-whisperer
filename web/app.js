var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var formidable = require('express-formidable');
var fileUpload = require('express-fileupload');

var routes = require('./routes/index');
var voice = require('./routes/voice');
var botname = require('./routes/botname');
var version = require('./routes/version');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(formidable());
app.use(fileUpload());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/voice', voice);
app.use('/botname', botname);
app.use('/version', version);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//check required ENV vars
var valid = true;
valid &= envVarExists('AWS_ACCESS_KEY_ID');
valid &= envVarExists('AWS_SECRET_ACCESS_KEY');
valid &= envVarExists('AWS_BOT_ALIAS');
valid &= envVarExists('AWS_BOT_NAME');
valid &= envVarExists('AWS_REGION');


if (!valid)
  process.exit();

console.log('All required environment variables were successfully accounted for.')


function envVarExists(name) {
  if (!process.env[name]) {
    console.log('Environment variable ' + name + ' is required.')
    return false;
  }

  return true;
}

module.exports = app;
