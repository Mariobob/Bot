const Command = require('../../structures').Command;

module.exports = class MineCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'mine',
      description: 'Mine some coins. (Easier way to get coins.)',
      syntax: 'mine',
      category: 'Economy',
      guildOnly: true,
      cooldown: 180 // Every 3 minutes they can mine coins.
    });
  }

  execute(ctx) {
    this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
      if (error) return this.bot.utils.handleDatabaseError(error);
      let chance = Math.round(Math.random());
      const amount = Math.floor(Math.random() * (500 - 100)) + 100;

      if (chance >= 0.5) {
        this.bot.r.table('users').get(ctx.author.id).update({
          coins: u.coins + amount
        }).run((error) => {
          if (error) return this.bot.utils.handleDatabaseError(error);
          return ctx.send(`:pick: | You went out mining and found **${amount.toLocaleString()}¥**.`);
        });
      } else {
        return ctx.send(`:pick: | Your pickaxe broke.`);
      }
    });
  }
};