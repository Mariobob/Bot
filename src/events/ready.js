const { Event } = require('../structures');
const { PlayerManager } = require('eris-lavalink');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'ready'
    });
  }

  execute() {
    this.bot.log.custom(`PROCESS ${process.pid}`, `${this.bot.user.username}#${this.bot.user.discriminator} (${this.bot.user.id}): Connection established.`);

    for (const shard of this.bot.shards.map(s => s)) {
      this.bot.editStatus('online', {
        name: `${this.bot.config.prefix}help | [${shard.id}] | ${this.bot.guilds.size} Guild${this.bot.guilds.size > 1 ? "s" : ""}`,
        type: 0
      });
    }

    this.bot.utils.post();

    /*if (!(this.bot.voiceConnections instanceof PlayerManager)) {
      this.bot.voiceConnections = new PlayerManager(this.bot, this.bot.config.lavalink.nodes, {
        defaultRegion: 'us',
        numShards: this.bot.shards.size,
        userId: this.bot.user.id
      });*/
  }
};