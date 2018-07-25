const { Command } = require('../../structures');

module.exports = class GoogleDoodleCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'google-doodle',
      description: 'Grabs a "Google Doodle" from an year and a month.',
      syntax: 'google-doodle [year] [month]',
      category: 'Events'
    });

    this.snek = require('snekfetch');
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an \`year\` argument.`);
    if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an \`month\` argument.`);

    let year = args[0];
    let month = args[1];

    try {
      const { body } = await this.snek.get(`https://www.google.com/doodles/json/${year}/${month}`);
      if (!body.length) return ctx.send(`${this.bot.constants.emojis.ERROR} | No results found.`);
      
      const data = body[month ? 0 : Math.floor(Math.random() * body.length)];
      const runDate = new Date(data.run_date_array.join('-')).toDateString();

      return ctx.send({
        description: `${runDate}: **${data.share_text}**`,
        image: {
          url: `https:${data.url}`
        },
        color: this.bot.color
      });
    } catch(e) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${e.message}\`. Try again later!`);
    }
  }
};