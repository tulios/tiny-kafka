const Server = require('./server')

const SIGNAL_TRAPS = ['SIGTERM', 'SIGINT', 'SIGUSR2']

const run = () => {
  const server = new Server()

  SIGNAL_TRAPS.map(type => {
    process.once(type, async () => {
      try {
        await server.close()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })

  server.listen()
}

module.exports = {
  run,
}
