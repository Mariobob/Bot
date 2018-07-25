const Command = require('../../structures').Command;

module.exports = class TranslateCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'translate',
      description: 'Translates text to another language.',
      syntax: 'translate [language] [text]',
      category: 'Text Edit'
    });

    this.translateAPI = require('google-translate-api');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | No language has been provided.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | No text provided.`);
    if (!this.bot.utils.supported(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid language, check <https://github.com/matheuss/google-translate-api/blob/master/languages.js#L9-L115> for the valid languages.`);

    this.translateAPI(args.slice(1).join(" "), { to: args[0] }).then((res) => ctx.send(`:scroll: | ${res.text}`));
  }
};