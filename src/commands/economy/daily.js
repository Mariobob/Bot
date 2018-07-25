const { Command } = require('../../structures');

module.exports = class DailyCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'daily',
      description: 'Get your daily yen.',
      syntax: 'daily',
      cooldown: 30,
      guildOnly: true,
      category: 'Economy'
    });
  }

  execute(ctx) {
    this.bot.r.table('intervals').get(ctx.author.id).run((error, result) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      const amount = Math.floor(Math.random() * (500 - 100)) + 100;

      if (result) {
        if (Date.now() - result.daily <= (1000 * 60 * 60 * 24)) return ctx.send(`:exclamation: | You already got paid! Please wait \`${this.bot.utils.duration((1000 * 60 * 60 * 24) - (Date.now() - result.daily))}\`.`);
        this.bot.r.table('intervals').get(ctx.author.id).update({
          daily: Date.now()
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          this.bot.utils.updateBalance(ctx, amount)
            .then((balance) => {
              return ctx.send(`:yen: | I have added \`${amount}¥\`! Your balance is \`${balance.toLocaleString()}¥\`.`);
            }).catch((error) => this.bot.utils.handleDatabaseError(error));
        });
      } else {
        this.bot.r.table('intervals').insert({
          id: ctx.author.id,
          daily: Date.now()
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          this.bot.utils.updateBalance(ctx, amount)
            .then((balance) => {
              return ctx.send(`:yen: | I have added \`${amount}¥\`! Your balance is \`${balance.toLocaleString()}¥\`.`);
            }).catch((error) => this.bot.utils.handleDatabaseError(error));
        });
      }
    });
  }
};