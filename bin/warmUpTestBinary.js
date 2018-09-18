#!/usr/bin/env node

const path = require('path')
const util = require('util')
const childProcess = require('child_process')
const exec = util.promisify(childProcess.exec)

const BINARY_NAME = process.platform === 'darwin' ? 'tiny-kafka-macos' : 'tiny-kafka'
const BINARY = path.join(__dirname, '../dist', BINARY_NAME)

exec(BINARY).catch(console.error)
