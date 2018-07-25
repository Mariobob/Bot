const Command = require('../../structures').Command;

module.exports = class NowPlayingCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'nowplaying',
      description: 'Shows the current song playing.',
      syntax: 'nowplaying',
      category: 'Music',
      guildOnly: true,
      aliases: [
        'np'
      ]
    });
  }

  execute(ctx) {
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (!this.bot.voiceConnections.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that voice channel.`);
    if (this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);
    if (!this.bot.queue.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not currently playing music in **${ctx.guild.name}**!`);

    const queue = this.bot.queue.get(ctx.guild.id);
    return ctx.send({
      title: "<a:music:466727792910794754> Currently Playing",
      description: [
        `**${queue.now.info.title}**\n`,
        `❯ **Author**: ${queue.now.info.author}`,
        `❯ **Duration**: ${this.bot.utils.formatMusicDuration(queue.position)}/${this.bot.utils.formatMusicDuration(queue.now.info.length)}`
      ].join('\n'),
      color: this.bot.color
    });
  }
};