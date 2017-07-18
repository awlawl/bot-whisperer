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

    var num = Math.round(Math.random()*100);
    var percent = Math.round(Math.random()*100)

    response.dialogAction.message.content = 'We produced ' + num + ' widgets today! Thats up ' + percent + ' percent from yesterday.';

    callback(null, response);
};
