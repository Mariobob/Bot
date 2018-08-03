const Command = require('../../structures').Command;

module.exports = class EyeifyCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'eyeify',
      description: '👀 Eyeifys 👀 your 👀 message. 👀',
      syntax: 'eyeify [text]',
      category: 'Text Edit'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | 👀 What 👀 do 👀 you 👀 need 👀 to 👀 clapify? 👀`);
    return ctx.send(`👀 ${args.join(' 👀 ')} 👀`);
  }
};