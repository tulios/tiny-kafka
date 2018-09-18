const os = require('os')
const fs = require('fs')
const path = require('path')
const { PID_PATH } = require('./constants')

module.exports = ({ pid }) => {
  const pidPath = pid || PID_PATH

  if (fs.existsSync(pidPath)) {
    const pidValue = fs.readFileSync(pidPath)

    try {
      process.kill(pidValue)
    } catch (_) {}

    // Check if the file exists again because on some targets pkg will execute
    // the daemonized cmd using "sh -c" generating another shell. So the file will
    // be deleted after killing the first process.
    fs.existsSync(pidPath) && fs.unlinkSync(pidPath)
  }
}
