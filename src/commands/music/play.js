const {
  Command,
  VoiceConnection
} = require('../../structures');

module.exports = class PlayCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'play',
      description: 'Play a song!',
      syntax: 'play [query]',
      category: 'Music',
      guildOnly: true,
      aliases: [
        'add'
      ]
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | What do you want me to queue if you didn't provide something?`);
    if (!ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in a channel.`);
    if (this.bot.voiceConnections.has(ctx.guild.id) && this.bot.voiceConnections.get(ctx.guild.id).channelId !== ctx.member.voiceState.channelID) return ctx.send(`${this.bot.constants.emojis.ERROR} | I'm not playing music in that channel, please join the channel I am currently in!`);

    return this.play(ctx, args);
  }

  play(ctx, args) {
    this.bot.utils.resolveTrack((/^https?:\/\//.test(args.join(' ')) ? '' : 'ytsearch:') + args.join(' '))
      .then((results) => {
        if (results.length < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | No results found.`);

        if (this.bot.voiceConnections.has(ctx.guild.id) && this.bot.queue.has(ctx.guild.id)) this.bot.queue.get(ctx.guild.id).queueSong(results);

        this.bot.utils.getPlayer(ctx.member.voiceState.channelID, ctx.guild)
          .then((player) => this.bot.queue.set(ctx.guild.id, new VoiceConnection(this.bot, ctx.channel, player, results)));
      });
  }
};