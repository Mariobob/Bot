const { Structures } = require('../structures');

module.exports = Structures.extend('TextChannel', TextChannel => class extends TextChannel {
  constructor(...args) {
    super(...args);
  }

  async awaitMessages(filter, options = {}) {
    const m = await this.guild.shard.client.collector.awaitMessage(options.channel, options.author, options.timeout, filter);
    return m;
  }
});