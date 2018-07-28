const { Command } = require('../../structures');

module.exports = class DogCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'dog',
      description: 'Grabs an random doggo photograph.',
      syntax: 'dog',
      aliases: [
        'doggo'
      ],
      category: 'Animals',
      cooldown: 5
    });

    this.request = require('../../util/RequestHandler');
  }

  async execute(ctx) {
    try {
      const { body } = await this.request.get('https://dog.ceo/api/breeds/image/random');

      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your doggo as requested! :dog:`,
        image: {
          url: body.message
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};