const os = require('os')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { PID_FILE, SIGNAL_TRAPS } = require('./constants')
const Server = require('../server')

const PID_PATH = path.join(os.tmpdir(), PID_FILE)

module.exports = () => {
  process.umask(0)
  const server = new Server({ port: process.env.PORT })

  SIGNAL_TRAPS.map(type => {
    process.once(type, async () => {
      try {
        await server.close()
        fs.unlinkSync(PID_PATH)
      } finally {
        process.kill(process.pid, type)
      }
    })
  })

  server
    .listen()
    .then(() => {
      fs.writeFileSync(PID_PATH, process.pid)
      console.log(PID_PATH)
    })
    .catch(e => true)
}
