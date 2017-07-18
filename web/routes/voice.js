var express = require('express');
var router = express.Router();
var fs = require('fs');
var AWS = require('aws-sdk');
var ffmpeg = require('ffmpeg');

AWS.config = new AWS.Config({
    region: process.env['AWS_REGION']
});

var lexruntime = new AWS.LexRuntime({
    region: process.env['AWS_REGION']
});

router.post('/', function(req, res, next) {
  var filenameBase = 'public/recordings/' + (new Date()).toISOString().replace(/:/g,'-');
  var filename = filenameBase + '.wav';
  var encodedFile = filenameBase + '-enc.wav';
  fs.writeFile(filename, req.files.voicefile.data, function(err) {
    if (err) console.log(err);
    else {
      console.log('wrote ' + filename);

      var ff = new ffmpeg(filename);
      ff.then(function (audio) {

      audio
      .setAudioChannels(1)
      .setAudioFrequency(16000)
      .save(encodedFile, function (error, file) {
        if (error)
          console.log('Error: ' + error);
        else {
          console.log('Done encoding.')
        var params = {
            botAlias: process.env['AWS_BOT_ALIAS'],
            botName: process.env['AWS_BOT_NAME'],
            contentType: 'audio/l16; rate=16000; channels=1',
            accept: 'audio/mpeg',
            inputStream: fs.readFileSync(encodedFile),
            userId: 'testuser'
        };
        lexruntime.postContent(params, function(err, data) {
            if (err)
              console.log(err, err.stack);
            else {
                if (data.audioStream) {
                  console.log(data.audioStream.length);
                  var responseFilename = filenameBase + '-response.mp3';
                  fs.writeFileSync(responseFilename,data.audioStream);
                  res.json({
                    responseUrl:responseFilename.replace(/public/g,''),
                    message: data.message,
                    inputTranscript: data.inputTranscript
                  });
                }
                console.log(data);

            }
        });
        }
      });
      });
    }
  });
});

router.get('/', function(req, res, next) {
  var filenameBase = 'public/recordings/' + (new Date()).toISOString().replace(/:/g,'-');

  var params = {
    botAlias: process.env['AWS_BOT_ALIAS'],
    botName: process.env['AWS_BOT_NAME'],
                contentType: 'text/plain; charset=utf-8',
                inputStream: 'Hello',
            userId: 'testuser',
            accept: 'audio/mpeg'
        };

  lexruntime.postContent(params, function(err, data) {
      if (err)
        console.log(err, err.stack);
      else {
          if (data.audioStream) {
            console.log(data.audioStream.length);
            var responseFilename = filenameBase + '-response.mp3';
            fs.writeFileSync(responseFilename,data.audioStream);
            res.json({
              responseUrl:responseFilename.replace(/public/g,''),
              message: data.message,
              inputTranscript: data.inputTranscript
            });
          }
          console.log(data);

      }
  });
});

module.exports = router;
