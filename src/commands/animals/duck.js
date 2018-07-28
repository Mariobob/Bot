const { Command } = require('../../structures');

module.exports = class DuckCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'duck',
      description: 'Grabs an random duck!',
      syntax: 'duck',
      category: 'Animals',
      cooldown: 5
    });

    this.request = require('../../util/RequestHandler');
  }

  async execute(ctx) {
    try {
      const { body } = await this.request.get('https://random-d.uk/api/v1/random');

      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your duck as requested! :duck:`,
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