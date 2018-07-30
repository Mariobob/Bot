const Command = require('../../structures').Command;
const request = require('node-superfetch');
const locales = ['en', 'jp'];

module.exports = class NekoAtsumePasswordCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'neko-atsume-password',
      description: 'Get today\'s Neko Atsume Password.',
      syntax: 'neko-atsume-password',
      category: 'Events',
      aliases: [
        'neko-pwd'
      ]
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Please choose a locale. Either ${this.bot.utils.list(locales, 'or')}`);
    if (!locales.includes(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid locale. Either ${this.bot.utils.list(locales, 'or')}`);

    try {
      const data = await this.fetch(args[0]);
      return ctx.send({
        description: [
          `**The current Neko Atsume password is \`${data.password}\`**\n`,
          `:black_small_square: **»** Expires at: ${this.bot.utils.duration(data.expires - data.date)}`,
          `:black_small_square: **»** Gold/Silver: ${data.gold} | ${data.silver}`
        ].join('\n'),
        color: this.bot.color
      });
    } catch(err) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Oh, an error has occured: \`${err.message}\`. Try again later!`);
    }
  }

  async fetch(locale) {
    const { text } = await request.get(`http://hpmobile.jp/app/nekoatsume/neko_daily${locale !== 'jp' ? `_${locale}` : ''}.php`);
    const data = text.split(',');
    const date = new Date();
    date.setUTCHours(date.getUTCHours() + 9);
    return {
      password: data[1],
      silver: data[2],
      gold: data[3],
      date,
      expires: this.bot.utils.tomorrow(9)
    };
  }
};