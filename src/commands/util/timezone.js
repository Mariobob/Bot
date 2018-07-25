const Command = require('../../structures').Command;

module.exports = class TimezoneCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'timezone',
      aliases: [
        'time'
      ],
      description: 'Shows the current time from that timezone.',
      syntax: 'timezone [timezone]',
      category: 'Utility'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You didn't provide a timezone. (List of timezones: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>)`);
    let timeZone = args[0];

    try {
      const time = new Date().toLocaleTimeString('en-US', { timeZone });
      return ctx.send(`${this.bot.constants.emojis.MEMO} | The current time in ${time} is: ${time}.`);
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid timezone. (Check here: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>)`);
    }
  }
};