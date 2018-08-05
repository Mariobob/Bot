const Command = require('../../structures').Command;

module.exports = class ShopCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'shop',
      description: 'Buy/Sell stuff from the shop or see the current shop.',
      syntax: 'shop [buy|sell] [item]',
      category: 'Economy',
      guild: true
    });
  }

  async execute(ctx, args) {
    if (!args[0]) {
      return ctx.send({
        title: `${ctx.guild.name}'s Shop`,
        description: `» **Rings** \`6,000¥\`\n» **Pickaxes** \`20,000¥\``,
        color: this.bot.color,
        footer: {
          text: 'My owner is deciding on stuff to add to the shop, if you have any suggestions, ask the developer!',
          icon_url: ctx.author.avatarURL
        }
      });
    } else if (args[0].toLowerCase() === 'buy') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an item to buy.`);

      if (args[1].toLowerCase() === 'ring') {
        if (await this.checkBalance(ctx.author) < 6000) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the nessary funds to buy the 'ring' item.`);

        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          if (u.inventory.rings) {
            this.bot.r.table('users').get(ctx.author.id).update({
              coins: u.coins - 20000,
              inventory: {
                rings: u.inventory.rings + 1
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              ctx.send(":ok_hand: | You have bought 1 ring for 6,000¥");
            });
          } else {
            this.bot.r.table('users').get(ctx.author.id).update({
              coins: u.coins - 20000,
              inventory: {
                pickaxes: 1
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              ctx.send(":ok_hand: | You have bought 1 ring for 20,000¥");
            });
          }
        });
      } else if (args[1].toLowerCase() === 'pickaxe') {
        if (await this.checkBalance(ctx.author) < 20000) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the nessary funds to buy the 'pickaxe' item.`);

        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          if (u.inventory.rings) {
            this.bot.r.table('users').get(ctx.author.id).update({
              coins: u.coins - 6000,
              inventory: {
                ring: u.inventory.rings + 1
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              ctx.send(":ok_hand: | You have bought 1 pickage for 6,000¥");
            });
          } else {
            this.bot.r.table('users').get(ctx.author.id).update({
              coins: u.coins - 6000,
              inventory: {
                rings: 1
              }
            }).run((error) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
              ctx.send(":ok_hand: | You have bought 1 pickaxe for 6,000¥");
            });
          }
        });
      }
    } else if (args[0].toLowerCase() === 'sell') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an item to sell.`);

      if (args[1].toLowerCase() === 'ring') {
        if (await this.bot.r.table('users').get(ctx.author.id).run().inventory.pickaxes < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the 'pickaxe' item.`);

        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          this.bot.r.table('users').get(ctx.author.id).update({
            coins: u.coins + 4000,
            inventory: {
              pickaxes: u.inventory.pickaxes - 1
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            ctx.send(":ok_hand: | You have selled 1 pickaxe for 6,000¥");
          });
        });
      } else if (args[1].toLowerCase() === 'pickaxe') {
        if (await this.bot.r.table('users').get(ctx.author.id).run().inventory.rings < 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't have the 'ring' item.`);

        this.bot.r.table('users').get(ctx.author.id).run((error, u) => {
          this.bot.r.table('users').get(ctx.author.id).update({
            coins: u.coins + 60000,
            inventory: {
              rings: 1
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            ctx.send(":ok_hand: | You have sell 1 ring for 60,000¥");
          });
        });
      }
    }
  }

  async checkBalance(user) {
    const uConfig = await this.bot.r.table('users').get(user.id).run();
    return uConfig.coins; // Number || 0
  }
};