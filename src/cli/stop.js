const os = require('os')
const fs = require('fs')
const path = require('path')
const { PID_FILE } = require('./constants')

const PID_PATH = path.join(os.tmpdir(), PID_FILE)

module.exports = () => {
  if (fs.existsSync(PID_PATH)) {
    const pid = fs.readFileSync(PID_PATH)
    try {
      process.kill(pid)
    } catch (_) {}
    fs.unlinkSync(PID_PATH)
  }
}
