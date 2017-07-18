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

    response.dialogAction.message.content = 'Hello! I am the Lex example for the bot whisperer project. You can ask me questions about the project such as: What is your purpose? Or, what can you do? Press and hold down the microphone button to speak to me.';

    callback(null, response);
};
