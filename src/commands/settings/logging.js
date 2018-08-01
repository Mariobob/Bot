const Command = require('../../structures').Command;

module.exports = class LoggingCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'logging',
      description: 'A "logging" toggle.',
      syntax: 'logging ["set"/"list"] ["channel"/"enable"] [value]',
      category: 'Settings',
      guildOnly: true
    });

    this.filter = (msg) => ['yes', 'y', 'n', 'no'].includes(msg.content.toLowerCase());
    this.no = ['no', 'n'];
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an argument.`);
    if (!ctx.member.permission.has('manageGuild') || !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the **\`Manage Guild\`** permission. ;w;`);

    if (args[0].toLowerCase() === 'set') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a key. (channel or enable)`);
      if (!args[2]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a value.`);

      if (args[1].toLowerCase() === 'channel') {
        this.bot.utils.resolveChannel(args[2], ctx.guild)
          .then(async(c) => {
            ctx.send(`${this.bot.constants.emojis.MEMO} | Do you want to see the loggings in <#${c.id}>?\nType __y__es or __n__o. You have 60 seconds to decide.`);
            const message = await this.bot.collector.awaitMessage(ctx.channel, ctx.author.id, 60e3, this.filter);

            if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

            if (this.no.includes(message.content.toLowerCase())) {
              return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't to see some events in <#${c.id}>? Ok!`);
            } else {
              this.bot.r.table('guilds').get(ctx.guild.id).update({
                logging: {
                  channel: c.id
                }
              }).run((error) => {
                if (error) return this.bot.utils.handleDatabaseError(error);
                return ctx.send(`${this.bot.constants.emojis.MEMO} | The logging channel has been set in <#${c.id}>.`);
              });
            }
          });
      } else if (args[1].toLowerCase() === 'enable') {
        let enabled;

        if (args[2].toLowerCase() === true) enabled = true;
        if (args[2].toLowerCase() === false) enabled = false;

        ctx.send(`${this.bot.constants.emojis.MEMO} | You want to ${enabled === true ? "enable" : "disable"} loggings?\nType __y__es or __n__o. You have 60 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel, ctx.author.id, 60e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (this.no.includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.ERROR} | So you do not wanna ${enabled === true ? "enable" : "disable"} logging? Noted.`);
        } else {
          this.bot.r.table('guilds').get(ctx.guild.id).update({
            logging: {
              enabled
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.MEMO} | Logging has been ${enabled === true ? "enabled" : "disabled"}.`);
          });
        }
      }
    } else if (args[0].toLowerCase() === 'list') {
      this.bot.r.table('guilds').get(ctx.guild.id).run((error, g) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        return ctx.sendCode('md', `# Current Logging State in ${ctx.guild.name}:\nEnabled?: ${g.logging.enabled}\nChannel (ID): ${g.logging.channel}`);
      });
    }
  }
};