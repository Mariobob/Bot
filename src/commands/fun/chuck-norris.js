const Command = require('../../structures').Command;

module.exports = class ChuckNorrisCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'chuck-norris',
      description: 'Grabs an "Chuck Norris" command.',
      syntax: 'chuck-norris',
      aliases: [
        'chuck-senpai',
        'chuck'
      ],
      category: "Fun"
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx) {
    try {
      const { body } = await this.snek.get('http://api.icndb.com/jokes/random');

      return ctx.send(`:mega: | ${body.value.joke}`);
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`​${err.message}\`.​ Try again later~`);
    }
  }
};