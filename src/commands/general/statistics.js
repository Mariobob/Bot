const Command = require('../../structures').Command;

module.exports = class StatisticsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'statistics',
      description: "Gets Rem's realtime statistics!",
      syntax: 'statistics',
      aliases: [
        'stats',
        'info',
        'botinfo'
      ]
    });
  }

  execute(ctx) {
    return ctx.send({
      title: "RemBot | Realtime Statistics",
      description: `Uptime: ${this.bot.utils.duration(Date.now() - this.bot.startTime)}`,
      color: this.bot.color,
      fields: [{
        name: ':joy: Misc',
        value: [
          `❯ **Guilds**: ${this.bot.guilds.size}`,
          `❯ **Users**: ${this.bot.users.size}`,
          `❯ **Channels**: ${Object.keys(this.bot.channelGuildMap).length}`,
          `❯ **Commands**: ${this.bot.cmds.size}`,
          `❯ **Memory Usage**: ${this.bot.utils.formatMemory(process.memoryUsage().heapUsed)}`,
          `❯ **Shard ID**: #${ctx.guild.shard.id}`,
          `❯ **Voice Connections**: ${this.bot.voiceConnections.size}`
        ].join("\n"),
        inline: true
      },
      {
        name: ':link: Links',
        value: [
          `❯ [**Upvote me!**](https://discordbots.org/bot/${this.bot.user.id})`,
          `❯ [**Invite me!**](https://discordapp.com/oauth2/authorize?client_id=${this.bot.user.id}&scope=bot)`
        ].join("\n"),
        inline: true
      }]
    });
  }
};