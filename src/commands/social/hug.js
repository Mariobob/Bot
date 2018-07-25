const Command = require('../../structures').Command;

module.exports = class HugCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'hug',
      description: 'Hug someone!',
      syntax: 'hug [user]',
      guildOnly: true,
      category: 'Social'
    });

    this.snek = require('snekfetch');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user to hug them!`);
    if (!ctx.mentions[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid user.`);

    this.snek
      .get('https://nekos.life/api/v2/img/hug')
      .then((res) => {
        ctx.send({
          description: `<@${ctx.author.id}> is hugging <@${ctx.mentions[0]}>`,
          image: {
            url: res.body.url
          },
          color: this.bot.color
        });
      });
  }
};