const { Command } = require('../../structures');

module.exports = class FeedCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'feed',
      description: 'Feed someone with delicious food!',
      syntax: 'feed [user]',
      category: 'Social',
      guildOnly: true
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user to feed them!`);
    if (!ctx.mentions[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid user.`);

    this.snek
      .get('https://nekos.life/api/v2/img/feed')
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is feeding <@${ctx.mentions[0]}>`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};