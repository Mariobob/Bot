const { Command } = require('../../structures');
const badges = [
  'developer',
  'staff',
  'trusted'
];

module.exports = class AddBadgeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'remove-badge',
      description: 'Removes an badge to a user. (!! Owner Only !!)',
      syntax: 'remove-badge [user] [badge]',
      category: 'Developers',
      hidden: true,
      ownerOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a badge. Choose ${this.bot.utils.list(badges, 'or')}`);
    if (!badges.includes(args[1])) return ctx.send(`${this.bot.constants.emojis.ERROR} | The badge is invalid! Please choose ${this.bot.utils.list(badges, 'or')}`);

    this.bot.utils.resolveUser(args[0])
      .then((user) => {
        this.bot.r.table('users').get(user.id).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);

          if (args[1].toLowerCase() === 'developer') {
            this.bot.r.table('users').get(user.id).update({
              badges: {
                isDeveloper: false
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              return ctx.send(`${this.bot.constants.emojis.SUCCESS} | User **${user.username}#${user.discriminator}** lost the **Developer** badge. :<`);
            });
          } else if (args[1].toLowerCase() === 'staff') {
            this.bot.r.table('users').get(user.id).update({
              badges: {
                isStaff: false
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              return ctx.send(`${this.bot.constants.emojis.SUCCESS} | User **${user.username}#${user.discriminator}** lost the **Staff** badge.`);
            });
          } else if (args[1].toLowerCase() === 'trusted') {
            this.bot.r.table('users').get(user.id).update({
              badges: {
                isTrusted: false
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              return ctx.send(`${this.bot.constants.emojis.SUCCESS} | User **${user.username}#${user.discriminator}** lost the **Trusted** badge.`);
            });
          }
        });
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found.`));
  }
};