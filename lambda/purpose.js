exports.handler = (event, context, callback) => {
   var response = {
        "sessionAttributes": {},
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                //"contentType": "SSML",
                "contentType": "PlainText",
                "content": ""
            }
        }
    };


    console.dir(event);

    //you can't get the transcript of an SSML response on the client end!
    //response.dialogAction.message.content = '<speak>I am a simple to configure and install website to help people demonstrate and test the voice capabilities of <say-as interpret-as="spell-out">AWS</say-as> Lex.</speak>';
    response.dialogAction.message.content = 'I am a simple to configure and install website to help people demonstrate and test the voice capabilities of AWS Lex.';

    callback(null, response);
};
