import yargs from "yargs";
import { argv } from "process";
import { type } from "os";

const args = yargs.alias(
    {
        p: 'port'
    }
).argv

module.exports = {
    PORT: argv[3] || 8080
}