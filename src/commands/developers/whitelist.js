const Command = require('../../structures').Command;

module.exports = class WhitelistCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'whitelist',
      description: 'Whitelists a guild/user.',
      syntax: 'whitelist ["user"/"guild"] [user/guild]',
      category: 'Developers',
      hidden: true
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an argument. (${this.bot.utils.list(list, 'or')})`);

    if (args[0].toLowerCase() === 'user') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user ID, mention, or query a name.`);

      this.bot.utils.resolveUser(args[1]).then(async(user) => {
        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna whitelist <@${user.id}> with the reason: \`${reason}\`?\nType __y__es or __n__o. You have 30 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 30e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'nu', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.MEMO} | <@${user.id}> will not be whitelisted.`);
        } else {
          this.bot.r.table('users').get(user.id).update({
            blacklist: {
              isBlacklisted: false,
              reason: null
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | <@${user.id}> is now whitelisted.`);
          });
        }
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found by that query. (Query: ${args[1]})`));
    } else if (args[0].toLowerCase() === 'guild') {
      let reason = args[2] ? `[Guild] ${args.slice(2).join(' ')}` : "[Guild] No reason provided.";

      this.bot.utils.resolveGuild(args.length > 0 ? args.join(" ") : ctx.guild.id).then((guild) => {
        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna whitelist Guild ${guild.name} (${guild.id}) with the reason: \`${reason}\`?\nType __y__es or __n__o. You have 30 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 30e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'nu', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.MEMO} | Guild ${guild.name} will not be whitelisted.`);
        } else {
          this.bot.r.table('guilds').get(guild.id).update({
            blacklist: {
              isBlacklisted: false,
              reason: null
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Guild ${guild.name} is now whitelisted.`);
          });
        }
      }).catch();
    }
  }
};