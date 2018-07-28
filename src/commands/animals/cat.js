const { Command } = require('../../structures');

module.exports = class CatCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'cat',
      description: 'Fetch an cute kitty cat! ^w^',
      syntax: 'cat',
      category: 'Animals',
      cooldown: 5
    });

    this.request = require('../../util/RequestHandler');
  }

  async execute(ctx) {
    try {
      const { body } = await this.request.get('https://nekos.life/api/img/v2/meow');

      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your kitty! :cat:`,
        color: this.bot.color,
        image: {
          url: body.url
        }
      });
    } catch(err) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${err.message}\`. Try again later~`);
    }
  }
};