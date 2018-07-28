const Command = require('../../structures').Command;

module.exports = class BadgeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'badge',
      description: 'Shows your current badge.',
      syntax: 'badge',
      category: 'Economy',
      guildOnly: true,
      cooldown: 5
    });
  }

  async execute(ctx) {
    const uConfig = await this.bot.r.table('users').get(ctx.author.id).run();
    return ctx.send(`${this.bot.constants.emojis.MEMO} | Your current badge is:\n\n${uConfig.badges.isDeveloper === true ? uConfig.badges.named.developer : uConfig.badges.isStaff === true ? uConfig.badges.named.staff : uConfig.badges.isTrusted === true ? uConfig.badges.named.trusted : uConfig.badges.named.normal}`);
  }
};