const Command = require('../../structures').Command;

module.exports = class ChannelInfoCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'channelinfo',
      description: 'Gives information about an voice or text channel.',
      syntax: 'channelinfo [channel]',
      category: 'Utility',
      guildOnly: true,
      aliases: [
        'channel-information',
        'channelinformation',
        'channel-info',
        'channel'
      ]
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveChannel(args.length > 0 ? args.join(" ") : ctx.channel.id)
      .then((channel) => {
        let embed = {
          title: `Channel ${(channel.type === 0 ? "#" : "") + channel.name}:`,
          fields: [{
            name: '❯ ID',
            value: channel.id
          },
          {
            name: '❯ Type',
            value: channel.type === 0 ? "Text" : channel.type === 2 ? "Voice" : channel.type === 4 ? "Category" : "Unknown",
            inline: true
          }],
          color: this.bot.color
        };

        if (channel.type === 0) embed.fields.push({
          name: '❯ NSFW',
          value: channel.nsfw  ? "Yes" : "No",
          inline: true
        });

        if (!ctx.guild || !ctx.guild.channels.has(channel.id)) {
          const guild = this.bot.guilds.get(this.bot.channelGuildMap[channel.id]);

          embed.fields.push({
            name: '❯ Guild',
            value: guild.name,
            inline: true
          });

          if (channel.type !== 4 && channel.parentID) embed.fields.push({
            name: '❯ Category',
            value: channel.guild.channels.get(channel.parentID).name,
            inline: true
          });

          if (channel.type === 2) {
            embed.fields.push({
              name: '❯ Users Connected',
              value: channel.voiceMembers.size,
              inline: true
            });

            embed.fields.push({
              name: '❯ User Limit',
              value: channel.userLimit,
              inline: true
            });
          }

          return ctx.send(embed);
        }
      });
  }
};