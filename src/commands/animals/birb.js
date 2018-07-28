const { Command } = require('../../structures');

module.exports = class BirbCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'birb',
      description: 'Grabs an random bird.',
      syntax: 'birb',
      aliases: [
        'bird'
      ],
      category: 'Animals',
      cooldown: 5
    });

    this.request = require('../../util/RequestHandler');
  }

  async execute(ctx) {
    try {
      const { body } = await this.request.get('http://random.birb.pw/tweet');

      message.delete();
      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your bird as requested:`,
        image: {
          url: `http://random.birb.pw/img/${body}`
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured while grabbing the bird: \`${e.message}\`. Try again later~`);
    }
  }
};