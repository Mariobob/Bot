const Command = require('../../structures').Command;

module.exports = class HexToIntCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'hti',
      description: 'Parses hexadecimals to integers.',
      syntax: 'hti [#hex]',
      category: 'Utility',
      aliases: [
        'hextoint',
        'hex-to-int'
      ]
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an hexadecimal. (A hexadecimal is \`#<hex>\`)`);

    let int = parseInt(args.join('').replace('#', ''), 16);

    return ctx.send(`${this.bot.constants.emojis.MEMO} | Here is the converted hex to int:\nHexadecimal: ${args[0]}\nInteger: ${int}`);
  }
};