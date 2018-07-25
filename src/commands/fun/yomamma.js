const { Command } = require('../../structures');

module.exports = class YoMammaCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'yomamma',
      description: "Grabs an 'Yo Mamma' joke.",
      syntax: 'yomamma',
      category: 'Fun'
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx) {
    try {
      const { body } = await this.snek.get('https://api.yomamma.info/');
      const text = JSON.parse(body);

      return ctx.send(`:mega: | ${text.joke}`);
    } catch(err) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${err.message}\`. Try again later!`);
    }
  }
};