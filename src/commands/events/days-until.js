const { Command } = require('../../structures');

module.exports = class DaysUntilCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'days-until',
      description: 'Shows the date you provided until the initial date.',
      syntax: 'days-until [month] [date]',
      category: 'Events'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must a provide a \`month\` argument.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must a provide a \`day\` argument.`);

    let month = args[0];
    let day = args[1];

    const now = new Date();
    let year = now.getMonth() + 1 <= month ? now.getFullYear() : now.getFullYear() + 1;
    if (month == now.getMonth() + 1 && now.getDate() >= day) ++year;
    const future = new Date(`${month}/${day}/${year}`);
    const time = Math.round((future - now) / (1000 * 60 * 60 * 24)) + 1;
    if (!time) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid date.`);
    return ctx.send(`:mega: | There is ${time} days until ${future.toDateString()}`);
  }
};