const Command = require('../../structures').Command;

module.exports = class ClapifyCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'clapify',
      description: '👏 Clapifys 👏 your 👏 message. 👏',
      syntax: 'clapify [text]',
      category: 'Text Edit'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | 👏 What 👏 do 👏 you 👏 need 👏 to 👏 clapify? 👏`);
    return ctx.send(`👏 ${args.join('👏')} 👏`);
  }
};