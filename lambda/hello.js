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

    response.dialogAction.message.content = 'Hello! I am the Lex example for the bot whisperer project. You can ask me questions about the project such as: What can you do? Or. What is the debug panel? Press and hold down the microphone button to speak to me.';



    callback(null, response);
};
