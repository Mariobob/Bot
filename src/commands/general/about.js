const Command = require('../../structures').Command;

module.exports = class AboutCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'about',
      description: "Gives information about Rem!",
      syntax: 'about',
      aliases: [
        'me'
      ],
      cooldown: 2
    });
  }

  execute(ctx) {
    return ctx.send({
      title: "Rem | レム",
      description: `:wave: Hello! I am [RemBot](https://github.com/ohlookitsAugust/RemBot), I am a discord bot made for Music, Moderation, Memes and more! If you wanna see what commands I have, do \`${ctx.prefix}help\`~`,
      color: this.bot.color
    });
  }
};