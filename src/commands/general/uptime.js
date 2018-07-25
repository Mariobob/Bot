const Command = require('../../structures').Command;

module.exports = class UptimeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'uptime',
      description: "See what the current bot uptime is.",
      syntax: 'uptime',
      cooldown: 2
    });
  }

  execute(ctx) {
    return ctx.send(`:gear: | ${this.bot.utils.duration(Date.now() - this.bot.startTime)}`);
  }
};