const Command = require('../../structures').Command;

module.exports = class SnipeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'snipe',
      description: 'Gets the latest deleted message.',
      syntax: 'snipe',
      category: 'Utility',
      guildOnly: true
    });
  }

  execute(ctx) {
    this.bot.r.table('snipes').get(ctx.channel.id).run((error, snipe) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (!snipe) ctx.send(`${this.bot.constants.emojis.ERROR} | There wasn't no snipes in this channel.`);
      this.bot.r.table('snipes').get(ctx.channel.id).delete().run((error) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        let structure = {
          author: {
            name: `User ${snipe.author.username}#${snipe.author.discriminator} (${snipe.author.id})`,
            icon_url: snipe.author.avatarURL || snipe.author.defaultAvatarURL
          },
          color: this.bot.color,
          footer: {
            text: `Sniped by ${ctx.author.username}#${ctx.author.discriminator}`,
            icon_url: ctx.author.avatarURL
          },
          timestamp: new Date(snipe.timestamp).toISOString()
        };

        if (snipe.content instanceof Object) {
          if ('fields' in snipe.content) structure.fields = snipe.content.fields;
					if ('title' in snipe.content) structure.title = snipe.content.title;
					if ('color' in snipe.content) structure.color = snipe.content.color;
					if ('url' in snipe.content) structure.url = snipe.content.url;
					if ('image' in snipe.content) structure.image = snipe.content.image;
        } else {
          structure.description = snipe.content;
        }

        return ctx.send(structure);
      });
    });
  }
};