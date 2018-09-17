#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const byApiKey = (a, b) => a.apiKey - b.apiKey
const destination = path.join(__dirname, '../src/availableApis.json')

const availableApis = glob
  .sync(path.join(__dirname, '../src/protocol/responses/*/index.js'))
  .map(path => require(path)())
  .map(entry => ({ apiKey: entry.apiKey, ...entry.versions }))

fs.writeFileSync(
  destination,
  JSON.stringify({
    errorCode: 0,
    apiVersions: availableApis.sort(byApiKey),
  })
)
