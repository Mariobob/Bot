const Event = require('../structures').Event;

module.exports = class GuildMemberRemoveEvent extends Event {
  constructor(bot) {
    super(bot, {
      event: 'guildMemberRemove'
    });
  }

  execute(guild, member) {
    this.bot.r.table('guilds').get(guild.id).run((error, gConfig) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (gConfig && gConfig.farewell.enabled && gConfig.farewell.channel && gConfig.farewell.message && guild.channels.has(gConfig.farewell.channel) && guild.channels.get(gConfig.farewell.channel).permissionsOf(this.bot.user.id).has('sendMessages')) {
        guild.channels.get(gConfig.farewell.channel).createMessage(this.bot.utils.formatMessage({
          message: gConfig.farewell.message,
          member,
          guild
        }));
      }
    });
  }
};