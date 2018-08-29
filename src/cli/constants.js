const PID_FILE = 'tiny-kafka.pid'
const BIN_FILE = '../../bin/tiny-kafka'
const SIGNAL_TRAPS = ['SIGTERM', 'SIGINT', 'SIGUSR2']
const WAIT_TIME = 100
const MAX_WAIT_TIME = 1000
const ERROR_FILE_NAME = 'tiny-kafka.error'
const LOG_FILE_NAME = 'tiny-kafka.log'

module.exports = {
  PID_FILE,
  BIN_FILE,
  SIGNAL_TRAPS,
  WAIT_TIME,
  MAX_WAIT_TIME,
  ERROR_FILE_NAME,
  LOG_FILE_NAME,
}
