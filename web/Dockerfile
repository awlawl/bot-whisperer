FROM ubuntu
EXPOSE 9090

ENV NPM_CONFIG_LOGLEVEL warn
CMD ["npm","start"]

RUN apt-get update && \
  apt-get install -y curl ffmpeg && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
  apt-get install -y nodejs build-essential && \
  rm -rf /var/lib/apt/lists/


RUN mkdir /var/wwwroot && \
  mkdir /var/wwwroot/public && \
  mkdir /var/wwwroot/public/recordings
WORKDIR /var/wwwroot

COPY package.json /var/wwwroot/
RUN npm install

COPY ./ /var/wwwroot
