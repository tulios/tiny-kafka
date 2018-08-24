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

class UnsupporterAPIVersionError extends TinyKafkaError {
  constructor(apiKey, apiVersion) {
    super(new Error(`Unsupported API version apiKey: ${apiKey}, apiVersion: ${apiVersion}`))
    this.apiKey = apiKey
    this.apiVersion = apiVersion
  }
}

module.exports = {
  TinyKafkaError,
  UnsupporterAPIError,
  UnsupporterAPIVersionError,
}
