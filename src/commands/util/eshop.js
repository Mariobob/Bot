const Command = require('../../structures').Command;
const systems = ['3ds', 'switch', 'wii_u'];

module.exports = class EShopCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'eshop',
      description: "Searches a game from the Nintendo EShop.",
      syntax: 'eshop [system] [query]',
      category: 'Utility'
    });

    this.requests = require('node-superfetch');
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a system. Either ${this.bot.utils.list(systems, 'or')}.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a game.`);
    if (!systems.includes(args[0])) return ctx.send(`${this.bot.constants.emojis.ERROR} | Invalid system. Either ${this.bot.utils.list(systems, 'or')}.`);

    try {
      const id = await this.search(args[0], args.slice(1).join(' '));
      if (!id) return ctx.send(`${this.bot.constants.emojis.ERROR} | No game found.`);
      const data = await this.fetch(id);
      return ctx.send({
        title: `Nintendo eShop (${args[0]}) | Game ${data.title}`,
        color: 0xFF7D01,
        description: [
          `» **Price**: ${data.eshop_price ? data.eshop_price === '0.00' ? 'Free' : `$${data.eshop_price}` : '???'}`,
          `» **Category**: ${data.game_category_ref ? data.game_category_ref.length ? data.game_category_ref[0].title : data.game_category_ref.title : '???'}`,
          `» **Release Date**: ${data.release_date ? new Date(data.release_date).toDateString() : '???'}`,
          `» **Player Count**: ${data.number_of_players || '???'}`,
          `» **DLC?**: ${data.dlc === 'true' ? "Yes" : 'No'}`,
          `» **Demo?**: ${data.demo === 'true' ? "Yes" : "No"}`,
          `» **Developer/Publisher**: ${data.developer_ref ? data.developer_ref.title : '???'}/${data.publisher_ref ? data.publisher_ref.title : '???'}`
        ].join('\n')
      });
    } catch(error) {
      this.bot.log.error(error.stack);
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${error.message}\`. Try again later!`);
    }
  }
  
  async search(system, query) {
    const { text } = await this.requests.get('https://www.nintendo.com/json/content/get/filter/game').query({
      system,
      sort: 'title',
      direction: 'asc',
      search: query,
      limit: 1,
      availability: 'now'
    });
    const body = JSON.parse(text);
    return body.games.game ? body.games.game.id : null;
  }

  async fetch(id) {
    const { text } = await this.requests.get(`https://www.nintendo.com/json/content/get/game/${id}`);
    return JSON.parse(text).game;
  }
};