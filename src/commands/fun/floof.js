const Command = require('../../structures').Command;
const request = require('node-superfetch');

module.exports = class FloofCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'floof',
      description: 'Grabs an random "floof" image.',
      syntax: 'floof',
      category: 'Fun',
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    try {
      const { body } = await request.get('https://api.ksoft.si/meme/random-image')
      .query({
        tag: 'floofs'
      })
      .set('Authorization', `Token ${this.bot.config.api_keys.NANI}`);

      return ctx.send({
        description: ':feet: Here is a floof for you~ :feet:',
        image: {
          url: body.url
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Oh, an error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};