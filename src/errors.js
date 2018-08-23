class TinyKafkaError extends Error {
  constructor(e) {
    super(e)
    Error.captureStackTrace(this, this.constructor)
    this.message = e.message || e
    this.name = this.constructor.name
  }
}

class UnsupporterAPIError extends TinyKafkaError {
  constructor(apiKey) {
    super(new Error(`Unsupported API Key ${apiKey}`))
    this.apiKey = apiKey
  }
}

module.exports = {
  TinyKafkaError,
  UnsupporterAPIError,
}
