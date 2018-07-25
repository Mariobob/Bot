const DadJokeClient = require('dadjoke.js').Client;
const Command = require('../../structures').Command;

module.exports = class DadJokeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'dadjoke',
      description: 'Get a random Dad Joke!',
      syntax: 'dadjoke',
      category: 'Fun',
      cooldown: 6,
      aliases: [
        'dad-joke',
        'dadjokes',
        'dad-jokes'
      ]
    });

    this.dadjoke = new DadJokeClient(this.bot.constants.ua);
  }

  execute(ctx, args) {
    this.dadjoke
      .get()
      .then((body) => {
        return ctx.send(`:mega: | ${body.joke}`);
      }).catch((error) => ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${error.message}\`. Try again later!`));
  }
};