const { Event } = require('../structures');

module.exports = class extends Event {
  constructor(bot) {
    super(bot, {
      event: 'ready'
    });
  }

  execute() {
    this.bot.log.custom(`Process ${process.pid}`, `${this.bot.user.username}#${this.bot.user.discriminator} (${this.bot.user.id}): Connection established.`);

    this.bot.webhook.send({
      title: `${this.bot.user.username}#${this.bot.user.discriminator} (${this.bot.user.id}) is now online.`,
      description: [
        `» **Guilds**: ${this.bot.guilds.size.toLocaleString()}`,
        `» **Users**: ${this.bot.users.size.toLocaleString()}`,
        `» **Channels**: ${Object.keys(this.bot.channelGuildMap).length}`,
        `» **Shards**: ${this.bot.shards.size}`,
        `» **Commands**: ${this.bot.cmds.size}`
      ].join('\n'),
      color: this.bot.color
    });

    this.bot.editStatus('online', {
      name: `${this.bot.config.prefix}help | ${this.bot.guilds.size.toLocaleString()} Guild${this.bot.guilds.size > 1 ? "s" : ""}`,
      type: 0
    });
    
    this.bot.utils.post();
  }
};