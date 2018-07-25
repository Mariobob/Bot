const Command = require('../../structures').Command;

module.exports = class AvatarCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'avatar',
      description: 'Get your own avatar or get another\'s user avatar.',
      syntax: 'avatar [user]',
      category: 'Utility',
      guildOnly: true
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveUser(args.length > 0 ? args.join(" ") : ctx.author.id)
      .then((user) => {
        return ctx.send({
          title: `Here is ${user.username}#${user.discriminator}'s avatar:`,
          image: {
            url: user.avatarURL || user.defaultAvatarURL
          }
        });
      });
  }
};