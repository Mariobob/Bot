const Kitsu = require('kitsu');
const CFClient = require('animu.js').Client;
const Command = require('../../structures').Command;

module.exports = class AnimeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'anime',
      description: 'Search some anime from a query or get a random animu photograph.',
      syntax: 'anime [query]',
      aliases: [
        'animu'
      ],
      category: 'Fun'
    });

    this.kitsu = new Kitsu();
    this.animu = new CFClient();
  }

  async execute(ctx, args) {
    if (!args[0]) {
      this.animu
        .anime()
        .then((body) => {
          ctx.send({
            image: {
              url: body.url
            },
            color: this.bot.color
          });
        });
    } else {
      const { data } = await this.kitsu.fetch('anime', {
        filter: {
          text: args.join('-')
        }
      });

      return this.make(ctx, data[0]);
    }
  }

  make(ctx, data) {
    const {
      titles, subtype, startDate, endDate, popularityRank, id, synopsis, episodeCount
    } = data;

    return ctx.send({
      title: `${titles.en} | ${titles.en_jp}`,
      description: synopsis.substring(0, 1000),
      url: `https://kitsu.io/anime/${id}`,
      color: this.bot.color,
      fields: [{
        name: 'Start Date',
        value: startDate,
        inline: true
      },
      {
        name: 'End Date',
        value: endDate || 'Still in progression.',
        inline: true
      },
      {
        name: 'Popularity Rank',
        value: popularityRank,
        inline: true
      },
      {
        name: 'Show Type',
        value: subtype,
        inline: true
      },
      {
        name: 'Episode Count',
        value: episodeCount,
        inline: true
      }]
    });
  }
};