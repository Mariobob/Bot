const { Command } = require('../../structures');

module.exports = class BetCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'bet',
      description: 'Bet your cash to double it or lose it.',
      syntax: 'bet [coins]',
      cooldown: 20,
      category: 'Economy',
      guildOnly: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide some coins to bet!`);
    if (isNaN(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | The bet amount must be an number!`);
    if (Number(args[0]) < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | The bet must be greater then 1.`);

    this.bot.r.table('users').get(ctx.author.id).run((error, settings) => {
      if (error) return this.bot.utils.handleDatabaseError(error, ctx);
      if (!settings.coins || settings.coins < Number(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have enough coins to bet!`);
      if (Math.round(Math.random()) >= 0.5) {
        this.bot.r.table('users').get(ctx.author.id).update({
          coins: settings.coins + Number(args[0])
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error, ctx);
          return ctx.send(`:yen: | You spinned the dial and won ${Number(args[0]).toLocaleString()}!`);
        });
      } else {
        this.bot.r.table('users').get(ctx.author.id).update({
          coins: settings.coins - Number(args[0])
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error, ctx);
          return ctx.send(`:yen: | You spinned the dial and lost ${Number(args[0]).toLocaleString()}...`);
        });
      }
    });
  }
};