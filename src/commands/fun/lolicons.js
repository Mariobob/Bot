const Command = require('../../structures').Command;

module.exports = class LoliconsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'lolicons',
      description: 'Lolicons such as yourself belong in jail.',
      syntax: 'lolicons',
      category: 'Fun',
      cooldown: 5
    });
  }

  execute(ctx) {
    return ctx.send({
      image: {
        url: 'https://i.imgur.com/QkflX2l.jpg'
      },
      color: this.bot.color
    });
  }
};