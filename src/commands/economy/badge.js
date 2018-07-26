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

  execute(ctx) {
    return ctx.__('commands.badge.message', {
      emote: this.bot.constants.emojis.MEMO,
      badge: ctx.member.settings.isDeveloper === true ? ctx.member.settings.named.developer : ctx.member.settings.isStaff === true ? ctx.member.settings.named.staff : ctx.member.settings.isTrusted === true ? ctx.member.settings.named.trusted : ctx.member.settings.named.normal
    });
  }
};