const { Command } = require('../../structures');

module.exports = class LizardCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'lizard',
      description: 'Grabs an random lizard.',
      syntax: 'lizard',
      aliases: [
        'lizzyboi'
      ],
      category: 'Animals',
      cooldown: 5
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx) {
    try {
      const { body } = await this.snek.get('https://nekos.life/api/v2/img/lizard');

      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your lizard as requested`,
        image: {
          url: body.url
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};