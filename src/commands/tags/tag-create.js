const Command = require('../../structures').Command;

module.exports = class TagCreateCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'tag-create',
      description: 'Creates a tag.',
      syntax: 'tag-create [name] [content]',
      guildOnly: true,
      category: 'Tags',
      cooldown: 20
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.contants.emojis.ERROR} | You must provide a tag name. ;w;`);
    if (!args[1]) return ctx.send(`${this.bot.contants.emojis.ERROR} | You must provide the tag's content. ;w;`);
    this.bot.r.table('tags').filter({
      guildId: ctx.guild.id,
      name: args[0].toLowerCase()
    }).run((error, settings) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (settings.length > 0) return ctx.send(':exclamation: | The tag already exists.');
      this.bot.r.table('tags').insert({
        guildId: ctx.guild.id,
        name: args[0].toLowerCase(),
        userId: ctx.author.id,
        value: args.slice(1).join(' ')
      }).run((error) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Tag \`${args[0].toLowerCase()}\` now is in the database.`);
      });
    });
  }
};