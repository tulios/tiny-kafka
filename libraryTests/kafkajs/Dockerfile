FROM node:8-alpine

WORKDIR /opt/tiny-kafka

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD src/ src/
ADD libraryTests/kafkajs/ libraryTests/kafkajs/

CMD ["sh", "./libraryTests/kafkajs/test.sh"]
