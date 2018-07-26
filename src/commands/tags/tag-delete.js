const Command = require('../../structures').Command;

module.exports = class TagDeleteCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'tag-delete',
      description: 'Deletes a tag.',
      syntax: 'tag-delete [name]',
      guildOnly: true,
      category: 'Tags',
      cooldown: 20
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a tag name. ;w;`);
    this.bot.r.table('tags').filter({
      guildId: ctx.guild.id,
      name: args[0].toLowerCase()
    }).run((error, tag) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (tag.length < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | Tag \`${args[0].toLowerCase()}\` doesn't exist.`);
      if (tag[0].userId !== ctx.author.id && !ctx.member.permission.has('manageMessage') && !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You need the **\`Manage Messages\`** permission or be the tag owner to delete the tag.`);
      this.bot.r.table('tags').filter({
        guildId: ctx.guild.id,
        name: args[0].toLowerCase()
      }).delete().run((error) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Deleted tag \`${args[0].toLowerCase()}\` from this server.`);
      });
    });
  }
};