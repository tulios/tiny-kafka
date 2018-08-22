const Server = require('../src/server')

const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
const server = new Server()

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await server.close()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

server.listen()
