const { Command } = require('../../structures');

module.exports = class PokeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'poke',
      description: 'Poke someone! >w<',
      syntax: 'poke [user]',
      category: 'Social',
      guildOnly: true
    });

    this.snek = require('snekfetch');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user!`);

    this.snek
      .get('https://nekos.life/api/v2/img/poke')
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is poking <@${ctx.mentions[0].id}>...`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};