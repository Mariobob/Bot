const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'shardResume'
    });
  }

  execute(id) {
    this.bot.log.info(`Shard #${id} resumed.`);
  }
};