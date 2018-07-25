const { Command } = require('../../structures');

module.exports = class TransferCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'transfer',
      description: 'Transfers money to another user.',
      syntax: 'transfer [user?] [amount?]',
      category: 'Economy',
      cooldown: 60,
      guildOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an amount to transfer to that user.`);
    if (isNaN(args[1])) return ctx.send(`${this.bot.constants.emojis.ERROR} | The amount must be an number.`);
    if (Number(args[1]) < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | The amount must be greater then 1.`);

    this.bot.utils.resolveUser(args[0])
      .then((user) => {
        this.bot.r.table('users').get(ctx.author.id).run((error, uConfig) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          if (!uConfig.coins || Number(args[1]) > uConfig.coins) return ctx.send(`${this.bot.constants.emojis.ERROR} | You can't transfer more money then you have right now.`);
          this.bot.r.table('users').get(ctx.author.id).update({
            coins: uConfig.coins - Number(args[1])
          }).run((error, balance) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            this.bot.r.table('users').get(user.id).run((error, bal) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              if (bal.coins) {
                this.bot.r.table('users').get(user.id).update({
                  coins: bal.coins + Number(args[1])
                }).run((error) => {
                  if (error) return this.bot.utils.handleDatabaseError(error);
                  return ctx.send(`:yen: | Sent \`${Number(args[1]).toLocaleString()}¥\` to <@${user.id}>.`);
                });
              } else {
                this.bot.r.table('users').get(user.id).update({
                  coins: Number(args[1])
                }).run((error) => {
                  if (error) return this.bot.utils.handleDatabaseError(error);
                  return ctx.send(`:yen: | Sent \`${Number(args[1]).toLocaleString()}¥\` to <@${user.id}>.`);
                });
              }
            });
          });
        });
      })
      .catch(() => {
        return ctx.send(`${this.bot.constants.emojis.ERROR} | No user found.`);
      });
  }
};