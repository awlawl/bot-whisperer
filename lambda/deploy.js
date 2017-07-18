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

    var buildNum = event.currentIntent.slots.Build;

    response.dialogAction.message.content = 'Deploying version ' + buildNum + ' to production. Check slack for more details.';

    callback(null, response);
};
