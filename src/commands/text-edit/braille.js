const Command = require('../../structures').Command;
const braille = require('../../assets/json/braille.json');

module.exports = class BrailleCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'braille',
      description: 'Converts text to "braille".',
      syntax: 'braille [text]',
      category: 'Text Edit'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | What do you want me to convert to braille?`);
    return ctx.send(`${this.bot.constants.emojis.MEMO} | Here is the converted text:\n${this.bot.utils.letterTranslate(args.join(" "), braille)}`);
  }
};