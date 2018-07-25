const { Command } = require('../../structures');

module.exports = class LickCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'lick',
      description: 'Lick someone! >w<',
      syntax: 'lick [user]',
      category: 'Social',
      guildOnly: true
    });

    this.snek = require('snekfetch');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user!`);

    this.snek
      .get('https://api.weeb.sh/images/random?type=lick')
      .set('Authorization', `Wolke ${this.bot.config.api_keys.weeb}`)
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is licking <@${ctx.mentions[0].id}>...`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};