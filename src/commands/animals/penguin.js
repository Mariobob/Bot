const { Command } = require('../../structures');

module.exports = class PenguinCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'penguin',
      description: 'Get an random penguin photograph.',
      syntax: 'penguin',
      category: 'Animals',
      cooldown: 5
    });

    this.request = require('node-superfetch');
  }

  async execute(ctx) {
    try {
      const { body } = await this.request.get('https://animals.anidiots.guide/penguin');

      return ctx.send({
        description: `<@${ctx.author.id}>: Here is your penguin as requested. :penguin:`,
        image: {
          url: body.link
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};