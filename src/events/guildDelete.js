const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'guildDelete'
    });
  }

  execute(guild) {
    this.bot.log.info(`Rem has left ${guild.name} (${guild.id})`);
    for (const shard of this.bot.shards.map(s => s)) {
      this.bot.editStatus('online', {
        name: `${this.bot.config.prefix}help | [${shard.id}] | ${this.bot.guilds.size} Guild${this.bot.guilds.size > 1 ? "s" : ""}`,
        type: 0
      });
    }
    this.bot.utils.post();
    this.bot.r.table('guilds').get(guild.id).delete().run();
  }
};