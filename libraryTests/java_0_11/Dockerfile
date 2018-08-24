# FROM loyaltyone/docker-alpine-java-node:jre-8-node-8
FROM chafik/mvn-jdk-node

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

WORKDIR /opt/tiny-kafka

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD bin/tiny-kafka bin/tiny-kafka
ADD src/ src/

ADD libraryTests/java_0_11/pom.xml libraryTests/java_0_11/pom.xml

RUN cd libraryTests/java_0_11; mvn clean install test

ADD libraryTests/java_0_11/ libraryTests/java_0_11/

CMD ["sh", "./libraryTests/java_0_11/test.sh"]
