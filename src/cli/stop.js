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

    fs.unlinkSync(pidPath)
  }
}
