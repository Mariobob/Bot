const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'shardDisconnect'
    });
  }

  execute(e, id) {
    this.bot.log.custom(`Shard #${id}`, e.stack);
  }
};