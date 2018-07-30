const { green, red, cyan, magenta, white, yellow } = require('colors');
const d = new Date();

module.exports = class Logger {
  constructor() {
    this.t = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;
  }

  info(message) {
    return console.info(`${this.t} [${cyan('INFO')}] » ${white(message)}`);
  }

  error(message) {
    return console.error(`${this.t} [${red('ERROR')}] » ${white(message)}`);
  }

  warn(message) {
    return console.warn(`${this.t} [${yellow('WARNING')}] » ${white(message)}`);
  }

  debug(message) {
    return console.debug(`${this.t} [${green('DEBUG')}] » ${white(message)}`);
  }

  custom(title, message) {
    return console.log(`${this.t} [${magenta(title)}] » ${white(message)}`);
  }
};