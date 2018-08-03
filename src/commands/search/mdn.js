const { Command } = require('../../structures');
const request = require('node-superfetch');

module.exports = class MDNCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'mdn',
      description: "Searches the Mozilla Developer Network for a JavaScript prototype.",
      syntax: 'mdn [prototype]',
      category: "Search",
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${ctx.bot.constants.emojis.ERROR} | You must provide a JavaScript prototype.`);

    try {
      const { body } = await request.get(`https://developer.mozilla.org/en-US/search.json`).query({
        q: args[0],
        locale: 'en-US',
        highlight: false
      });
      if (!body.documents.length) return ctx.send(`${ctx.bot.constants.emojis.ERROR} | No results found.`);
      const data = body.documents[0];
      return ctx.send({
        title: `Mozilla Developer Network | ${data.title}`,
        color: 0x066FAD,
        description: data.excerpt
      });
    } catch(error) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Oh, an error has occured: \`${error.message}\`. Try again later!`);
    }
  }
};