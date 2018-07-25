const { Command } = require('../../structures');

module.exports = class KissCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'kiss',
      description: 'Kiss someone!',
      syntax: 'kiss [user]',
      category: 'Social',
      guildOnly: true
    });

    this.snek = require('snekfetch');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user to kiss.`);

    this.snek
      .get('https://nekos.life/api/v2/img/kiss')
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is kissing <@${ctx.mentions[0]}>~`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};