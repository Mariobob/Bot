const { Command } = require('../../structures');
const Kitsu = require('kitsu');

module.exports = class MangaCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'manga',
      description: 'Grabs an random manga from a query.',
      syntax: 'manga [<manga>]',
      category: 'Fun'
    });

    this.kitsu = new Kitsu();
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | What manga do you want me to search?`);

    const { data } = await this.kitsu.fetch('manga', {
      filter: {
        text: args.join('-')
      }
    });

    return this.makeEmbed(ctx, data[0]);
  }

  makeEmbed(ctx, data) {
    const {
      titles, subtype, startDate, endDate, popularityRank, id, synopsis
    } = data;

    return ctx.send({
      title: `${titles.en} | ${titles.en_jp}`,
      description: synopsis.substring(0, 1000),
      url: `https://kitsu.io/manga/${id}`,
      color: this.bot.color,
      fields: [{
        name: "Start / End Date",
        value: `${startDate}/${endDate || 'Still in progress.'}`,
        inline: true
      },
      {
        name: "Popularity Rank",
        value: popularityRank,
        inline: true
      },
      {
        name: 'Show Type',
        value: subtype,
        inline: true
      }]
    });
  }
};