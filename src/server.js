const net = require('net')
const path = require('path')
const uuid = require('uuid/v4')
const Decoder = require('kafkajs/src/protocol/decoder')
const Encoder = require('kafkajs/src/protocol/encoder')
const RequestDecoder = require('./protocol/request')
const ResponseEncoder = require('./protocol/responses')
const apiKeys = require('./protocol/apiKeys')
const { NAMESPACES } = require('./store')

const ESCAPE = String.fromCharCode(27)
const BEL = String.fromCharCode(7)

const API_KEY_IDS = Object.keys(apiKeys)
const getApiNameByKey = apiKey => API_KEY_IDS.find(key => apiKeys[key] === apiKey)

const setProcessTitle = () => (process.title = 'TinyKafka')
const setTerminalTitle = () => process.stdout.write(ESCAPE + ']0;' + process.title + BEL)

const PRIVATE = {
  NET_SERVER: Symbol('private:netServer'),
  STORE: Symbol('private:store'),
}

module.exports = class Server {
  constructor({ host = '0.0.0.0', port = 9092 } = {}) {
    this.host = host
    this.port = port

    this[PRIVATE.STORE] = new Map()
    this[PRIVATE.STORE].set(NAMESPACES.BROKER, { host, port })
    this[PRIVATE.STORE].set(NAMESPACES.CLUSTER_ID, uuid())
    this[PRIVATE.STORE].set(NAMESPACES.TOPICS, new Map())

    this[PRIVATE.NET_SERVER] = net.createServer(socket => this.handleConnection(socket))
    this[PRIVATE.NET_SERVER].on('error', error => this.handleError(error))
  }

  listen() {
    setProcessTitle()
    setTerminalTitle()

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(reject, 1000)
      this[PRIVATE.NET_SERVER].listen(this.port, this.host, () => {
        console.log(`-> Server running at ${this.host}:${this.port}`)
        clearTimeout(timeout)
        resolve()
      })
    })
  }

  close() {
    return new Promise(resolve => {
      this[PRIVATE.NET_SERVER].close(() => {
        console.log('\n-> Server closed')
        resolve()
      })
    })
  }

  handleError(error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Error, address in use: ${error.message}`)
      return this.close()
    }

    console.error(error)
  }

  handleConnection(socket) {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`
    socket.incomingBuffer = Buffer.alloc(0)
    console.log(`-> ${socket.name} connected`)

    socket.on('data', data => {
      this.bufferIncomingData(socket, data)
    })

    socket.on('error', error => {
      console.error(error)
      socket.destroy(error)
    })

    socket.on('end', () => {
      console.log(`-> ${socket.name} disconnected`)
      socket.end()
    })
  }

  bufferIncomingData(socket, rawData) {
    socket.incomingBuffer = Buffer.concat([socket.incomingBuffer, rawData])

    while (Buffer.byteLength(socket.incomingBuffer) > Decoder.int32Size()) {
      const data = Buffer.from(socket.incomingBuffer)
      const decoder = new Decoder(data)
      const expectedResponseSize = decoder.readInt32()

      if (!decoder.canReadBytes(expectedResponseSize)) {
        return
      }

      const request = new Decoder(decoder.readBytes(expectedResponseSize))
      // Reset the buffer as the rest of the bytes
      socket.incomingBuffer = decoder.readAll()

      this.onRequest(socket, expectedResponseSize, request.buffer).catch(e => {
        console.error(`-> ${socket.name} Failed to process request: ${e.message}`)
        socket.destroy(e)
      })
    }
  }

  async onRequest(socket, requestSize, requestBuffer) {
    console.log(`-> ${socket.name} processing incoming data`)
    console.log(`-> ${socket.name}`, JSON.stringify(requestBuffer))

    const request = await RequestDecoder(requestBuffer)
    const apiName = getApiNameByKey(request.apiKey)
    const logHeader = `${socket.name} [${apiName}]`
    const incomingRequestLog = JSON.stringify({
      apiKey: request.apiKey,
      apiVersion: request.apiVersion,
      correlationId: request.correlationId,
      clientId: request.clientId,
    })

    console.log(`-> ${logHeader} ${requestSize} bytes, request: ${incomingRequestLog}`)
    console.log(`-> ${logHeader}`, JSON.stringify(request.payload))

    try {
      const responseBuffer = await ResponseEncoder(this[PRIVATE.STORE], request)

      const responseEncoder = new Encoder()
        .writeInt32(request.correlationId)
        .writeBuffer(responseBuffer)

      const { buffer } = new Encoder()
        .writeInt32(responseEncoder.size())
        .writeEncoder(responseEncoder)

      console.log(`<- ${logHeader} sending ${responseEncoder.size()} bytes`)
      socket.write(buffer)
    } catch (e) {
      console.error(`X ${logHeader}`, e)
      socket.destroy(e)
    }
  }
}
