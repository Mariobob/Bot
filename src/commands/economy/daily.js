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
      const upvoterAmount = Math.floor(Math.random() * (500 - 100)) + 150;
      const donatorAmount = Math.floor(Math.random() * (500 - 100)) + 250;

      if (result) {
        if (Date.now() - result.daily <= (1000 * 60 * 60 * 24)) return ctx.send(`:exclamation: | You already got paid! Please wait \`${this.bot.utils.duration((1000 * 60 * 60 * 24) - (Date.now() - result.daily))}\`.`);
        this.bot.r.table('intervals').get(ctx.author.id).update({
          daily: Date.now()
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          if (this.donatorStatus(ctx.author)) {
            this.bot.utils.updateBalance(ctx.author, donatorAmount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${donatorAmount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Donator Status**)`);
            });
          } else if (this.upvoterStatus(ctx.author)) {
            this.bot.utils.updateBalance(ctx.author, upvoterAmount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${upvoterAmount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Upvoter Status**)`);
            });
          } else {
            this.bot.utils.updateBalance(ctx.author, amount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${amount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Normal User**)`);
            });
          }
        });
      } else {
        this.bot.r.table('intervals').insert({
          id: ctx.author.id,
          daily: Date.now()
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          if (this.donatorStatus(ctx.author)) {
            this.bot.utils.updateBalance(ctx.author, donatorAmount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${donatorAmount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Donator Status**)`);
            });
          } else if (this.upvoterStatus(ctx.author)) {
            this.bot.utils.updateBalance(ctx.author, upvoterAmount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${upvoterAmount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Upvoter Status**)`);
            });
          } else {
            this.bot.utils.updateBalance(ctx.author, amount).then((balance) => {
              return ctx.send(`:yen: | I have added \`${amount}¥\`! Now you have \`${balance.toLocaleString()}¥\`(**Normal User**)`);
            });
          }
        });
      }
    });
  }

  async donatorStatus(user) {
    const uConfig = await this.bot.r.table('users').get(user.id).run();
    return uConfig.donator;
  }

  async upvoterStatus(user) {
    const uConfig = await this.bot.r.table('users').get(user.id).run();
    return uConfig.upvoter;
  }
};