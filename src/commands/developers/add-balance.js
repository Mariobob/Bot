const { Command } = require('../../structures');

module.exports = class AddBalanceCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'add-balance',
      description: 'Adds x amount to a user\'s balance. (!! Owner Only !!)',
      syntax: 'add-balance [user] [amount]',
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
              return ctx.send(`:yen: | <@${user.id}> has gotten \`${Number(args[1]).toLocaleString()}¥\` to their balance.`);
            });
          } else {
            this.bot.r.table('users').get(user.id).update({
              coins: Number(args[1])
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              return ctx.send(`:yen: | <@${user.id}> has gotten \`${Number(args[1]).toLocaleString()}¥\` to their balance.`);
            });
          }
        });
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found by that query.`));
  }
};