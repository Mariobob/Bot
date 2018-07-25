const Command = require('../../structures').Command;

module.exports = class AmIAdminCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'amiadmin',
      description: 'Are you admin?',
      syntax: 'amiadmin',
      category: 'Utility'
    });
  }

  execute(ctx) {
    if (!this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.MEMO} | You are not admin.`);
    return ctx.send(`${this.bot.constants.MEMO} | You are an admin.`);
  }
};