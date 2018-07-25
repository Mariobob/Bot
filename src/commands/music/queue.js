const Command = require('../../structures').Command;

module.exports = class QueueCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'queue',
      description: 'Grabs the current queue.',
      syntax: 'queue',
      category: 'Music',
      guildOnly: true
    });
  }

  execute(ctx) {
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (!this.bot.voiceConnections.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that voice channel.`);
    if (this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);
    if (!this.client.queue.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not currently playing music in **${ctx.guild.name}**!`);

    const queue = this.bot.queue.get(ctx.guild.id);
    if (queue.queue.length < 2) return ctx.send(`${this.bot.constants.emojis.ERROR} | There is no songs in the queue, how about queue some up!`);

    return ctx.send({
      title: `${ctx.guild.name}'s Queue`,
      color: this.bot.color,
      description: `Current Song: ${queue.now.info.title}\n\n${queue.queue.slice(1).map(song => `${(queue.queue.slice(1).indexOf(song) + 1)}: \`${song.info.title}\``)}`
    });
  }
};