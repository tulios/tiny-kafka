#!/bin/bash -ex

cd libraryTests/java_0_11/
mvn test-compile dependency:copy-dependencies
java -jar target/dependency/junit-platform-console-standalone-1.1.1.jar \
  -cp target/classes \
  -cp target/test-classes \
  -cp $(echo target/dependency/* | tr ' ' :) \
  --scan-class-path target/test-classes
