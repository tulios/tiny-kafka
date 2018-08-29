const yargs = require('yargs')

const daemonize = require('./daemonize')
const run = require('./run')
const stop = require('./stop')

module.exports = () => {
  yargs
    .usage('Usage: $0 <command> [options]')
    .command({
      command: 'start',
      desc: 'Start server',
      builder: yargs => {
        yargs.option('detach', {
          alias: 'd',
          describe: 'Run in background and print PID',
          type: 'boolean',
          default: false,
        })
        yargs.option('log', {
          alias: 'l',
          describe: 'Log to ./tiny-kafka.log',
          type: 'boolean',
          default: false,
        })
      },
      handler: argv => {
        const { detach, log } = argv
        detach ? daemonize({ log }) : run()
      },
    })
    .command({
      command: 'stop',
      desc: 'Stop server',
      handler: argv => stop(),
    })
    .demandCommand()
    .strict()
    .help('help')
    .alias('help', 'h')
    .showHelpOnFail(false, 'Use --help for available options').argv
}
