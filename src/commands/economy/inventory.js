const Command = require('../../structures').Command;

module.exports = class InventoryCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'inventory',
      description: 'Shows your current inventory or another user\'s.',
      syntax: 'inventory [user]',
      category: 'Economy',
      guild: true,
      aliases: [
        'inv'
      ]
    });
  }

  execute(ctx, args) {
    this.bot.utils.resolveUser(args.length > 0 ? args.join(' ') : ctx.author.id)
      .then(async(user) => {
        const inv = await this.userInventory(user);

        return ctx.send({
          title: `${user.username}#${user.discriminator}'s Current Inventory:`,
          description: `:ring: **Rings**: ${inv.rings}\n:pickaxe: **Pickaxes**: ${inv.pickaxes}`,
          color: this.bot.color
        });
      }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No user found.`));
  }

  async userInventory(user) {
    const uConfig = await this.bot.r.table('users').get(user.id).run();
    return {
      rings: uConfig.inventory.rings,
      pickaxes: uConfig.inventory.pickaxes
    };
  }
};