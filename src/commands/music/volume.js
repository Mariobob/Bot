const Command = require('../../structures').Command;

module.exports = class VolumeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'volume',
      description: 'Changes the volume.',
      syntax: 'volume [vol]',
      category: "Music",
      guildOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | No volume has been provided.`);
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (!this.bot.voiceConnections.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that voice channel.`);
    if (this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);
    if (!this.bot.queue.has(ctx.guild.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not currently playing music in **${ctx.guild.name}**!`);

    const queue = this.bot.queue.get(ctx.guild.id);
    
    if (args[0]) {
      if (isNaN(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | The volume must be an number.`);
      if (Number(args[0]) < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | The volume must be higher or equal to \`1\`.`);
      if (Number(args[0]) > 150) return ctx.send(`${this.bot.constants.emojis.ERROR} | The volume must be lower or equal to \`150\`.`);
      queue.setVol(args[0]);
    }

    return ctx.send({
      title: 'Current Volume',
      color: this.bot.color,
      description: `${'|' + (queue.volume >= 10 ? (`[${Array(Math.floor(queue.volume / 10)).fill('—').join('')}](${this.bot.gatherInvite(0)})`) : Array(Math.floor(15 - (queue.volume / 10))).fill('—').join('') + '| `' + queue.volume + '`')}`
    });
  }
};