const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'shardReady'
    });
  }

  execute(id) {
    this.bot.log.info(`Shard #${id} connected.`);
  }
};