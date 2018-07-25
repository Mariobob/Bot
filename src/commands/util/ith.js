const Command = require('../../structures').Command;

module.exports = class IntToHexCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'ith',
      description: 'Parses integers to hexadecimals.',
      syntax: 'ith [int]',
      category: 'Utility',
      aliases: [
        'inttohex',
        'int-to-hex'
      ]
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an integer.`);

    let hex = (parseInt(args.join(""))).toString(16);

    return ctx.send(`${this.bot.constants.emojis.MEMO} | Here is the converted int to hex:\nInteger: ${args[0]}\nHexadecimal: #${hex}`);
  }
};