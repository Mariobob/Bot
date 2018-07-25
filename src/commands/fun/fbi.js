const Command = require('../../structures').Command;
const gif = ['https://derpyenterprises.org/fbi.gif', 'https://derpyenterprises.org/fbi2.gif'];

module.exports = class FBICommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'fbi',
      description: "Are you l00ding people?!",
      syntax: 'fbi [user]',
      category: 'Fun',
      guildOnly: true
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveUser(args.length > 0 ? args.join(' ') : ctx.author.id)
      .then((user) => {
        return ctx.send({
          title: `Meanwhile at ${user.username}'s house...`,
          image: {
            url: gif[Math.floor(gif.length * Math.random())],
          },
          color: this.bot.color
        });
      });
  }
};