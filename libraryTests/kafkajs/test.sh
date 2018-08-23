#!/bin/bash -ex

./node_modules/.bin/jest libraryTests/kafkajs/index.spec.js --forceExit --detectOpenHandles
