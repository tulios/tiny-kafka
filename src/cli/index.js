const yargs = require('yargs')

const { PID_PATH } = require('./constants')
const daemonize = require('./daemonize')
const run = require('./run')
const stop = require('./stop')

module.exports = () => {
  yargs
    .usage('Usage: $0 <command> [options]')
    .command({
      command: 'start',
      desc: 'Start server. Use PORT to change the default port (9292)',
      builder: yargs => {
        yargs.option('detach', {
          alias: 'd',
          describe: 'Run in background and print PID',
          type: 'boolean',
          default: false,
        })
        yargs.option('pid', {
          describe: 'Path for the PID file',
          type: 'string',
          default: PID_PATH,
        })
        yargs.option('port', {
          alias: 'p',
          describe: 'Server port',
          type: 'number',
          default: 9292,
        })
        yargs.option('log', {
          alias: 'l',
          describe: 'Log to ./tiny-kafka.log',
          type: 'boolean',
          default: false,
        })
      },
      handler: argv => {
        const { detach, pid, port, log } = argv
        detach ? daemonize({ log, pid, port }) : run({ pid, port })
      },
    })
    .command({
      command: 'stop',
      desc: 'Stop server',
      builder: yargs => {
        yargs.option('pid', {
          describe: 'Path for the PID file',
          type: 'string',
          default: PID_PATH,
        })
      },
      handler: argv => stop({ pid: argv.pid }),
    })
    .demandCommand()
    .strict()
    .help('help')
    .alias('help', 'h')
    .showHelpOnFail(false, 'Use --help for available options').argv
}
