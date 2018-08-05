const { Command } = require('../../structures');
const request = require('node-superfetch');

module.exports = class FourKCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: '4k',
      description: '4K ( ͡° ͜ʖ ͡°)',
      syntax: '4k',
      upvoter: true,
      nsfw: true,
      category: 'NSFW'
    });
  }

  execute(ctx) {
    try {
      const { body } = await request.get('https://nekobot.xyz/api/image').query({
        type: '4k'
      });

      return ctx.send({
        title: '4K ( ͡° ͜ʖ ͡°)',
        image: {
          url: body.message
        },
        color: this.bot.color
      });
    } catch(error) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${error.message}\`. Try again later!`);
    }
  }
};