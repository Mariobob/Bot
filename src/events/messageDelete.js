const Event = require('../structures').Event;

module.exports = class MessageDeleteEvent extends Event {
  constructor(bot) {
    super(bot, {
      event: 'messageDelete'
    });
  }

  execute(msg) {
    // If there is no content, guild, or author.
    if (!msg.content || !msg.channel.guild || !msg.author) return;

    // Logging
    this.bot.r.table('guilds').get(msg.channel.guild.id).run((error, gConfig) => {
      if (error) return this.bot.utils.handleDatabaseError(error);

      if (gConfig && gConfig.logging.enabled && gConfig.logging.channel && guild.channel.has(gConfig.logging.channel).permissionsOf(this.bot.user.id).has('sendMessages')) {
        guild.channels.get(gConfig.logging.channel).createMessage({
          embed: {
            title: 'A message has been deleted!',
            description: msg.content,
            fields: [{
              name: 'Author',
              value: msg.author.username,
              inline: true
            }],
            timestamp: msg.timestamp
          }
        });
      }
    });

    // Snipes
    this.bot.r.table('snipes').insert({
      id: msg.channel.id,
      content: msg.embeds.length > 0 ? msg.embeds[0] : msg.content,
      author: msg.author.toJSON(),
      timestamp: msg.timestamp
    }, { conflict: 'replace' }).run((error) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
    });
  }
};