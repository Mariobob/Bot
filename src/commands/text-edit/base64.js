const Command = require('../../structures').Command;
const modes = ['encode', 'decode'];

module.exports = class Base64Command extends Command {
  constructor(bot) {
    super(bot, {
      command: 'base64',
      description: 'Encodes/decodes text.',
      syntax: 'base64 [mode] [text]',
      category: 'Text Edit'
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Please choose a valid base64 mode. (${this.bot.utils.list(modes, 'or')})`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide text.`);

    const { to, from } = await this.base64(args.slice(1).join(" "), args[0]);
    return ctx.send({
      description: [
        `❯ **From**: ${from}`,
        `❯ **To**: ${to}`
      ].join('\n'),
      color: this.bot.color
    });
  }

  base64(text, mode) {
    const to = this.bot.utils.base64(text, mode);
    if (!to) return 'Invalid mode.';
    return {
      from: text,
      to
    };
  }
};