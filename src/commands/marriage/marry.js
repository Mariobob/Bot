const Command = require('../../structures').Command;

module.exports = class MarryCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'marry',
      description: "Marries a user~",
      syntax: 'marry [user]',
      category: 'Marriage',
      guild: true,
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user mention or id.`);

    this.bot.utils.resolveUser(args[0])
      .then((user) => {
        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          this.bot.r.table('users').get(user.id).run(async(error, o) => {
            if (error) return this.bot.utils.handleDatabaseError(error);

            if (o.marriages.isMarried) return ctx.send(`${this.bot.constants.emojis.ERROR} | <@${user.id}> is already married.`);
            if (u.marriages.isMarried) return ctx.send(`${this.bot.constants.emojis.ERROR} | You are already married.`);

            ctx.send(`${this.bot.constants.emojis.MEMO} | <@${user.id}>, do you take <@${ctx.author.id}> as your bride/groom?\nSay __y__es or __n__o. You have 60 seconds to decide!`);

            const message = await this.bot.collector.awaitMessage(ctx.channel.id, user.id, 60e3, (m) => ['y', 'yes', 'no', 'n'].includes(m.content.toLowerCase()));

            if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt time out, sorry <@${ctx.author.id}>... :<`);

            if (['no', 'n'].includes(message.content.toLowerCase())) {
              return ctx.send(`:cry: | Sorry, <@${ctx.author.id}>. He/she said no...`);
            } else {
              this.bot.r.table('users').get(ctx.author.id).update({
                marriages: {
                  isMarried: true,
                  to: user.id
                }
              }).run((error) => {
                if (error) return this.bot.utils.handleDatabaseError(error);
                this.bot.r.table('users').get(user.id).update({
                  marriages: {
                    isMarried: true,
                    to: ctx.author.id
                  }
                }).run((error) => {
                  if (error) return this.bot.utils.handleDatabaseError(error);
                  return ctx.send(`:sparkling_heart: | <@${ctx.author.id}> and <@${user.id}> are happlied married! :D`);
                });
              });
            }
          });
        });
      });
  }
};