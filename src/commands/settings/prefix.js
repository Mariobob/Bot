const Command = require('../../structures').Command;

module.exports = class PrefixCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'prefix',
      description: 'Shows the current prefix or sets a new prefix.',
      syntax: 'prefix [prefix:str]',
      category: 'Settings',
      guildOnly: true,
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.MEMO} | The current prefix for **\`${ctx.guild.name}\`** is: \`${ctx.prefix}[command]\``);
    if (!ctx.channel.permissionsOf(ctx.author.id).has('manageGuild') && !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the \`Manage Guild\` permission.`);

    let prefix = args.slice(0).join(" ");

    if (prefix.length > 10) return ctx.send(`${this.bot.constants.emojis.ERROR} | The prefix must be lower or equal to 10.`);
    if (prefix === ctx.getPrefix()) return ctx.send(`${this.bot.constants.emojis.ERROR} | That's the current prefix.`);

    this.bot.r.table('guilds').get(ctx.guild.id).update({
      prefix
    }).run((error) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      ctx.setPrefix(prefix);
      return ctx.send(`${this.bot.constants.emojis.MEMO} | The prefix is now \`${prefix}\`. ;w;`);
    });
  }
};