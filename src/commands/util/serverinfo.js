const Command = require('../../structures').Command;

module.exports = class ServerInformationCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'serverinfo',
      aliases: [
        'server-info',
        'server-information',
        'guild-info',
        'guild-information',
        'guildinfo',
        'serverinformation',
        'guild',
        'server'
      ],
      description: 'Gives detailed information about your guild or another person\'s guild.',
      syntax: 'serverinfo [guild?]',
      category: 'Utility',
      guildOnly: true
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveGuild(args.length > 0 ? args.join(' ') : ctx.guild.id)
      .then((guild) => {
        return ctx.send({
          title: `Guild ${guild.name}`,
          color: this.bot.color,
          thumbnail: {
            url: guild.icon ? guild.iconURL : null
          },
          fields: [{
            name: '❯ ID',
            value: guild.id
          },
          {
            name: '❯ Region',
            value: guild.region,
            inline: true
          },
          {
            name: '❯ Owner',
            value: `<@${guild.ownerID}>`,
            inline: true
          },
          {
            name: '❯ Members',
            value: guild.memberCount,
            inline: true
          },
          {
            name: '❯ Channels',
            value: guild.channels.size,
            inline: true
          },
          {
            name: '❯ Emojis',
            value: guild.emojis.length,
            inline: true
          },
          {
            name: '❯ Roles',
            value: guild.roles.size,
            inline: true
          }]
        });
      });
  }
};