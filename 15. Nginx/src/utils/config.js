const yargs = require('yargs');

const argv = yargs.options({
    env: {
        alias: 'e',
        choices: ['dev', 'prod'],
        //demandOption: true,
        description: 'app environment'
    },
    port: {
        alias: 'p',
        default: 8080,
        description: 'port'
    },
    mode: {
        alias: 'm',
        choices: ['fork','cluster'],
        default: 'fork',
        description: 'mode'
    },
}).argv;

module.exports = {
    ENV: argv.env,
    PORT: argv.port,
    MODE: argv.mode
}

