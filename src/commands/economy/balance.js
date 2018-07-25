const { Command } = require('../../structures');

module.exports = class BalanceCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'balance',
      description: 'Shows your balance or another user\'s balance.',
      syntax: 'balance [user?]',
      category: 'Economy',
      guildOnly: true,
      aliases: [
        'bal'
      ],
      cooldown: 10
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveUser(args.length > 0 ? args.join(" ") : ctx.author.id)
      .then((user) => {
        this.bot.r.table('users').get(user.id).run((error, settings) => {
          if (error) return this.bot.utils.handleDatabaseError(error, ctx);

          if (user.id === ctx.author.id) {
            return ctx.send(`:yen: | You have \`${settings.coins ? settings.coins.toLocaleString() : 0}¥\``);
          } else {
            return ctx.send(`:yen: | <@${user.id}> has \`${settings.coin ? settings.coins.toLocaleString() : 0}¥\``);
          }
        });
      }).catch(() => {
        return ctx.send(`${this.bot.constants.emojis.ERROR} | No user found.`);
      });
  }
};