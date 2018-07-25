const Command = require('../../structures').Command;

module.exports = class DivorceCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'divorce',
      description: "Divorces your loved one. *crys*",
      syntax: 'divorce [user]',
      category: 'Marriage',
      guild: true,
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide your loved one.`);

    this.bot.utils.resolveUser(args[0])
      .then((user) => {
        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          this.bot.r.table('users').get(user.id).run(async(error, o) => {
            if (error) return this.bot.utils.handleDatabaseError(error);

            if (!o.marriages.isMarried) return ctx.send(`${this.bot.constants.emojis.ERROR} | <@${user.id}> is not even married!`);
            if (!u.marriages.isMarried) return ctx.send(`${this.bot.constants.emojis.ERROR} | You're not even married.`);
            if (o.marriages.to !== ctx.author.id) return ctx.send(`${this.bot.constants.emojis.ERROR} | You're not even married to that person!`);

            ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you're gonna divorce <@${user.id}>?\nRespond with __y__es or __n__o. You have 60 seconds to decide!`);

            const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 60e3, (m) => ['yes', 'y', 'no', 'n'].includes(m.content.toLowerCase()));

            if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

            if (['yes', 'y'].includes(message.content.toLowerCase())) {
              this.bot.r.table('users').get(ctx.author.id).update({
                marriages: {
                  isMarried: false,
                  to: null
                }
              }).run((error) => {
                if (error) return this.bot.utils.handleDatabaseError(error);
                this.bot.r.table('users').get(user.id).update({
                  marriages: {
                    isMarried: false,
                    to: null
                  }
                }).run((error) => {
                  if (error) return this.bot.utils.handleDatabaseError(error);
                  return ctx.send(`:broken_heart: | <@${ctx.author.id}> and <@${user.id}> have been divorced. :cry:`);
                });
              });
            }
          });
        });
      });
  }
};