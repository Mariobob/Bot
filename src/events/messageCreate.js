const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'messageCreate'
    });
  }

  execute(msg) {
    this.bot.commandHandler.handleCommand(msg);
  }
};