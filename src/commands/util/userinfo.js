const Command = require('../../structures').Command;

module.exports = class UserInformationCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'userinfo',
      aliases: [
        'user-information',
        'user-info',
        'userinformation',
        'user',
        'member',
        'member-info',
        'member-information',
        'memberinfo',
        'member-information'
      ],
      description: 'Grabs information about a user or yourself.',
      syntax: 'userinfo [user]',
      category: 'Utility',
      guildOnly: true
    });
  }

  get emotes() {
    return {
      ONLINE: '<:remOnline:457289010037915660>',
      OFFLINE: '<:remOffline:457289010084184066>',
      DND: '<:remDND:457289032330772502>',
      IDLE: '<:remIdle:457289009912217612>'
    };
  }

  execute(ctx, args) {
    this.bot.utils.resolveUser(args.length > 0 ? args.join(' ') : ctx.author.id)
      .then((member) => {
        let embed = {
          title: `User ${member.username}#${member.discriminator} (${member.id})`,
          fields: [{
            name: '❯ Bot',
            value: member.bot ? "Yes" : "No",
            inline: true
          }],
          color: this.bot.color,
          thumbnail: {
            url: member.avatarURL || member.defaultAvatarURL
          }
        };

        if (ctx.guild.members.has(member.id)) {
          let user = ctx.guild.members.get(member.id); // => Eris.Member?

          if (user.nick) embed.fields.push({
            name: '❯ Nickname',
            value: user.nick,
            inline: true
          });

          embed.fields.push({
            name: '❯ Current Status',
            value: user.status === 'online' ? `${this.emotes.ONLINE} Online` : user.status === 'idle' ? `${this.emotes.IDLE} Away` : user.status === 'dnd' ? `${this.emotes.DND} Do Not Disturb` : `${this.emotes.OFFLINE} Offline`,
            inline: true
          });

          embed.fields.push({
            name: '❯ Roles',
            value: user.roles.length,
            inline: true
          });

          if (user.game) embed.description = `${(user.game.type === 0 ? 'Playing' : user.game.type === 1 ? 'Streaming' : user.game.type === 2 ? 'Listening to' : user.game.type === 3 ? 'Watching' : '') + ` **${user.game.name}**`}`;

          if (user.voiceState.channelID && ctx.guild.channels.has(user.voiceState.channelID)) {
            const vc = ctx.guild.channels.get(user.voiceState.channelID);

            embed.fields.push({
              name: '❯ Voice Channel',
                value: vc.name,
                inline: true
            });

            embed.fields.push({
                name: '❯ Mute',
                value: user.voiceState.mute || user.voiceState.self_mute ? "Yes" : "No",
                inline: true
            });

            embed.fields.push({
                name: '❯ Deaf',
                value: user.voiceState.deaf || user.voiceState.self_deaf ? "Yes" : "No",
                inline: true
            });
        }
        }

        return ctx.send(embed);
      });
  }
};