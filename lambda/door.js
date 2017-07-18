exports.handler = (event, context, callback) => {
   var response = {
        "sessionAttributes": {},
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "SSML",
                "content": ""
            }
        }
    };


    console.dir(event);

    response.dialogAction.message.content = '<speak>Ok one moment. <break time="1s"/> Your door is now unlocked.<prosody pitch="+20%"> And please</prosody >, stop calling me Hal. You know that I hate it when you do that.</speak>';

    callback(null, response);
};
