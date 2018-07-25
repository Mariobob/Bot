const Command = require('../../structures').Command;

module.exports = class StopCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'stop',
      description: 'Stops the current queue.',
      syntax: 'stop',
      category: 'Music',
      guildOnly: true
    });
  }

  execute(ctx) {
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (!this.bot.voiceConnections.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that voice channel.`);
    if (this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);
    if (!this.bot.queue.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not currently playing music in **${ctx.guild.name}**!`);

    const queue = this.bot.queue.get(ctx.guild.id);
    queue.clear();
  }
};