const { Command } = require('../../structures');

module.exports = class TagsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'tags',
      description: 'Send the content of a tag.',
      syntax: 'tags [name]',
      category: 'Tags',
      guildOnly: true,
      cooldown: 10
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a tag name.`);
    this.bot.r.table('tags').filter({
      guildId: ctx.guild.id,
      name: args[0].toLowerCase()
    }).run((error, tags) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      if (tags.length < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | No tag has been created by the name \`${args[0].toLowerCase()}\`.`);
      return ctx.send(tags[0].value);
    });
  }
};

/*
			this.r.table('tags').filter({ guildID: msg.channel.guild.id, name: args[0].toLowerCase() }).run((error, tags) => {
				if (error) return handleDatabaseError(error, msg);
				if (tags.length < 1) return msg.channel.createMessage(':exclamation:   **»**   Unable to find any tags by that name.');
				msg.channel.createMessage(tags[0].value);
			});*/