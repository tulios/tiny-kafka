const os = require('os')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const stop = require('./stop')
const {
  PID_PATH,
  BIN_FILE,
  WAIT_TIME,
  MAX_WAIT_TIME,
  ERROR_FILE_NAME,
  LOG_FILE_NAME,
} = require('./constants')

const RUNNING_ON_NODE = /node$/.test(process.execPath)
const NODE_BIN_PATH = path.join(__dirname, BIN_FILE)
const BIN_PATH = RUNNING_ON_NODE ? NODE_BIN_PATH : process.execPath

const waitForChild = (pidPath, totalWait = 0) => {
  if (!fs.existsSync(pidPath)) {
    if (totalWait >= MAX_WAIT_TIME) {
      console.error('Failed to start tiny-kafka, check ./tiny-kafka.error for more information')
      return process.exit(1)
    }

    return setTimeout(() => waitForChild(pidPath, totalWait + WAIT_TIME), WAIT_TIME)
  }

  process.stdout.write(`${fs.readFileSync(pidPath)}`)
}

module.exports = ({ log = false, pid = null, port }) => {
  stop({ pid })

  const pidPath = pid || PID_PATH
  const assignedPort = port || process.env.PORT
  const stdio = ['ignore']

  log ? stdio.push(fs.openSync(LOG_FILE_NAME, 'a')) : stdio.push('ignore')
  stdio.push(fs.openSync(ERROR_FILE_NAME, 'a'))

  const cmdArgs = []

  if (!RUNNING_ON_NODE) {
    // pkg is removing the entrypoint so it has to be added again
    // https://github.com/zeit/pkg/issues/376
    cmdArgs.push(NODE_BIN_PATH)
  }

  cmdArgs.push('start', '--port', assignedPort, '--pid', pidPath)

  const child = spawn(BIN_PATH, cmdArgs, {
    cwd: process.cwd(),
    env: process.env,
    detached: true,
    shell: true,
    stdio,
  })

  child.unref()
  waitForChild(pidPath)
}
