const Command = require('../../structures').Command;
const list = ['user', 'guild'];

module.exports = class BlacklistCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'blacklist',
      description: "Adds a blacklist to a user/guild.",
      syntax: 'blacklist ["user"/"guild"] [user/guild] [reason]',
      category: 'Developers',
      hidden: true
    });

    this.filter = (m) => ['yes', 'ye', 'y', 'no', 'nu', 'no'].includes(m.content.toLowerCase());
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an argument. (${this.bot.utils.list(list, 'or')})`);

    if (args[0].toLowerCase() === 'user') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user ID, mention, or query a name.`);
      let reason = args[2] ? `[User] ${args.slice(2).join(' ')}` : "[User] No reason provided.";

      this.bot.utils.resolveUser(args[1]).then(async(user) => {
        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna blacklist <@${user.id}> with the reason: \`${reason}\`?\nType __y__es or __n__o. You have 30 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 30e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'nu', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.MEMO} | <@${user.id}> will not be blacklisted.`);
        } else {
          this.bot.r.table('users').get(user.id).update({
            blacklist: {
              isBlacklisted: true,
              reason
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | <@${user.id}> is now blacklisted.`);
          });
        }
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found by that query. (Query: ${args[1]})`));
    } else if (args[0].toLowerCase() === 'guild') {
      let reason = args[2] ? `[Guild] ${args.slice(2).join(' ')}` : "[Guild] No reason provided.";

      this.bot.utils.resolveGuild(args.length > 0 ? args.join(" ") : ctx.guild.id).then((guild) => {
        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna blacklist Guild ${guild.name} (${guild.id}) with the reason: \`${reason}\`?\nType __y__es or __n__o. You have 30 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 30e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'nu', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.MEMO} | Guild ${guild.name} will not be blacklisted.`);
        } else {
          this.bot.r.table('guilds').get(guild.id).update({
            blacklist: {
              isBlacklisted: true,
              reason
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Guild ${guild.name} is now blacklisted.`);
          });
        }
      }).catch();
    }
  }
};