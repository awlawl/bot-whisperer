# Bot Whisperer
## Talk to your AWS Lex bot using only a web browser. Works on desktop Chrome, Firefox and mobile Chrome on Android (tested on Galaxy S7)

## Getting Started

1. Make sure you have the latest version of docker installed.
2. Create a file named docker-compose.yml and put this in the file:

```
version: "2"
services:
  bot-whisperer:
    build: .
    image: awlawl/bot-whisperer:0.9.0
    ports:
      - "9090:9090"
    env_file:
      - .env
```

3. Create a file named .env and use this, but fill in the relevant details on the right side of the equals (no need for quotes);

```
AWS_ACCESS_KEY_ID=XXXXX
AWS_SECRET_ACCESS_KEY=XXXXX
AWS_BOT_ALIAS=$LATEST
AWS_BOT_NAME=XXXX
AWS_REGION=us-east-1
```

4. Now you can run this command to start the Bot Whisper web application on port 9090
```
docker-compose up
```

Any issues connecting to AWS will be logged to the console.

#Notes
1. Browser security requires that microphone access is only allowed to sites hosted on localhost or on an https endpoint. Otherwise you can't use the microphone button.
2. IOS and Safari is not supported yet. It is possible that those browsers don't fully support the components of the browser media api yet. (getUserMedia)

#Contributions and licenses
This software is licensed under the MIT license.

This software uses [Recorderjs](https://github.com/mattdiamond/Recorderjs) under the MIT license.
