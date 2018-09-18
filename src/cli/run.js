const os = require('os')
const fs = require('fs')
const net = require('net')
const path = require('path')
const { spawn } = require('child_process')
const { PID_PATH, SIGNAL_TRAPS } = require('./constants')
const Server = require('../server')

module.exports = ({ pid, port }) => {
  process.umask(0)

  const pidPath = pid || PID_PATH
  const assignedPort = port || process.env.PORT
  const server = new Server({ port: assignedPort })

  SIGNAL_TRAPS.map(type => {
    process.once(type, async () => {
      try {
        await server.close()
        fs.unlinkSync(pidPath)
      } finally {
        process.kill(process.pid, type)
      }
    })
  })

  server
    .listen()
    .then(() => {
      fs.writeFileSync(pidPath, process.pid)
      console.log(pidPath)
    })
    .catch(e => true)
}
