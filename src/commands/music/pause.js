const Command = require('../../structures').Command;
const choices = [
  'true',
  'false'
];

module.exports = class PauseCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'pause',
      description: 'Pauses/Resumes the queue.',
      syntax: 'pause [value]',
      category: 'Music',
      guildOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a true/false statement.`);
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (!this.bot.voiceConnections.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that voice channel.`);
    if (this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);
    if (!this.bot.queue.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not currently playing music in **${ctx.guild.name}**!`);

    const queue = this.bot.queue.get(ctx.guild.id);
    
    switch (args[0]) {
      case "true":
      case "True":
        if (queue.paused) return ctx.send(`${this.bot.constants.emojis.ERROR} | The queue is already paused.`);
        queue.pause(true);
        return ctx.send(":pause_button: | The queue has been paused.");
      case "false":
      case "False":
        if (!queue.paused) return ctx.send(`${this.bot.constants.emojis.ERROR} | The queue is not paused.`);
        queue.pause(false);
        return ctx.send(`${this.bot.constants.emojis.SUCCESS} | The queue has been resumed.`);
      default:
        return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid choice. Choose ${this.bot.utils.list(choices, 'or')}`);
        break;
    }
  }
};