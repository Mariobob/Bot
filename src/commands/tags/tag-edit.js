const Command = require('../../structures').Command;

module.exports = class TagUpdateCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'tag-edit',
      description: 'Edits a tag with new content.',
      syntax: 'tag-edit [name]',
      guildOnly: true,
      category: 'Tags',
      cooldown: 20
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a tag name. ;w;`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide the tag content. ;w;`);
    this.bot.r.table('tags').filter({
      guildId: ctx.guild.id,
      name: args[0].toLowerCase()
    }).run((error, tag) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (tag.length < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | Tag \`${args[0].toLowerCase()}\` doesn't exist.`);
      if (tag[0].userId !== ctx.author.id && !ctx.member.permission.has('manageMessage') && !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You need the **\`Manage Messages\`** permission or be the tag owner to edit tags.`);
      this.bot.r.table('tags').filter({
        guildId: ctx.guild.id,
        name: args[0].toLowerCase()
      }).update({
        value: args[1].toLowerCase()
      }).run((error) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Tag \`${args[0].toLowerCase()}\` was updated.`);
      });
    });
  }
};