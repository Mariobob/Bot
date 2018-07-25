const Clever = require('cleverbot.io');
const Command = require('../../structures').Command;

module.exports = class CleverbotCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'cleverbot',
      description: 'Ask the intelligent "cleverbot" a question.',
      syntax: 'cleverbot [<question...>]',
      category: 'Fun',
      aliases: [
        'clever'
      ],
      cooldown: 10
    });

    this.clever = new Clever(this.bot.config.api_keys.cleverbot.user, this.bot.config.api_keys.cleverbot.key);
    this.clever.create((error, nick) => {
      if (error) throw error;
      this.clever.setNick(nick);
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a question to ask the intelligent cleverbot.`);
    ctx.channel.sendTyping();
    this.clever.ask(args.join(' '), (error, response) => {
      if (error) return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${error.message}\`. Try again later!`);
      return ctx.reply(response);
    });
  }
};