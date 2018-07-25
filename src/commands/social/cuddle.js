const { Command } = require('../../structures');

module.exports = class CuddleCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'cuddle',
      description: 'Cuddle with someone~',
      syntax: 'cuddle [user]',
      category: 'Social',
      guildOnly: true
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must mention a user to cuddle with.`);
    if (!ctx.mentions[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid user.`);

    this.snek
      .get('https://nekos.life/api/v2/img/cuddle')
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is cuddling with <@${ctx.mentions[0].id}>~`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};