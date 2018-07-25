const { Command } = require('../../structures');

module.exports = class AddBalanceCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'remove-balance',
      description: 'Removes x amount to a user\'s balance. (!! Owner Only !!)',
      syntax: 'remove-balance [user] [amount]',
      category: 'Developers',
      hidden: true,
      ownerOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a balance.`);
    if (isNaN(args[1])) return ctx.send(`${this.bot.constants.emojis.ERROR} | The balance must be an number.`);
    if (Number(args[1]) < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | The balance must be greater or equal to 1.`);

    this.bot.utils.resolveUser(args[0])
      .then((user) => {
        this.bot.r.table('users').get(user.id).run((error, uConfig) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          if (uConfig.coins) {
            this.bot.r.table('users').get(user.id).update({
              coins: uConfig.coins + Number(args[1])
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              return ctx.send(`:yen: | <@${user.id}> has lost \`${Number(args[1]).toLocaleString()}¥\`.`);
            });
          } else {
            return ctx.send(`:yen: | <@${ctx.author.id}>, ${user.username} doesn't have a balance, so you can't remove anything!`);
          }
        });
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found by that query.`));
  }
};