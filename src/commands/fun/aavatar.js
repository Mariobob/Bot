const Command = require('../../structures').Command;

module.exports = class AnimeAvatarCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'aavatar',
      description: 'Grabs an random "anime avatar".',
      syntax: 'aavatar',
      category: 'Fun',
      aliases: [
        'anime-avatar'
      ]
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx) {
    try {
      const { body } = await this.snek.get('https://nekos.life/api/v2/img/avatar');

      return ctx.send({
        color: this.bot.color,
        image: {
          url: body.url
        }
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};