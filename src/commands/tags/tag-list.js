const { Command } = require('../../structures');

module.exports = class ListTagCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'tag-list',
      description: 'List the current tags of the guild you\'re in.',
      syntax: 'tag-list',
      guildOnly: true,
      category: "Tags"
    });
  }

  execute(ctx) {
    this.bot.r.table('tags').filter({ guildId: ctx.guild.id }).run((error, tags) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (tags.length < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | There are no tags in guild **\`${ctx.guild.name}\`**.`);
      return ctx.send({
        title: `» Tags (${tags.length})`,
        description: tags.map(t => `:black_small_square: » **${t.name}**`).join('\n\n'),
        color: this.bot.color,
        footer: {
          text: `You can use the tags by doing ${ctx.getPrefix()}tags [tag_name]`,
          icon_url: ctx.author.avatarURL
        }
      });
    });
  }
};