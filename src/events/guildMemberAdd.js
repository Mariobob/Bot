const Event = require('../structures').Event;

module.exports = class GuildMemberAddEvent extends Event {
  constructor(bot) {
    super(bot, {
      event: 'guildMemberAdd'
    });
  }

  execute(guild, member) {
    this.bot.r.table('guilds').get(guild.id).run((error, gConfig) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (gConfig && gConfig.greetings.enabled && gConfig.greetings.channel && gConfig.greetings.message && guild.channels.has(gConfig.greetings.channel) && guild.channels.get(gConfig.greetings.channel).permissionsOf(this.bot.user.id).has('sendMessages')) {
        guild.channels.get(gConfig.greetings.channel).createMessage(this.bot.utils.formatMessage({
          message: gConfig.greetings.message,
          member,
          guild
        }));
      }
    });
  }
};