FROM scardon/ruby-node-alpine:2.5

WORKDIR /opt/tiny-kafka

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD bin/tiny-kafka bin/tiny-kafka
ADD src/ src/

ADD libraryTests/ruby-kafka/Gemfile libraryTests/ruby-kafka/Gemfile
ADD libraryTests/ruby-kafka/Gemfile.lock libraryTests/ruby-kafka/Gemfile.lock

RUN cd libraryTests/ruby-kafka; bundle install

ADD libraryTests/ruby-kafka/ libraryTests/ruby-kafka/

CMD ["sh", "./libraryTests/ruby-kafka/test.sh"]
