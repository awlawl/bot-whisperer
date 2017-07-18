exports.handler = (event, context, callback) => {
   var response = {
        "sessionAttributes": {},
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": ""
            }
        }
    };


    console.dir(event);

    response.dialogAction.message.content = 'You can click on the debug panel below to see a text and audio log of our conversation. Try it out!'

    callback(null, response);
};
