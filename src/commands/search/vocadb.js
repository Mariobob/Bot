const { Command } = require('../../structures');
const request = require('node-superfetch');
const { shorten } = require('../../util/StringUtil');

module.exports = class VocadbCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'vocadb',
      description: 'Searches a VocaDB for a vocaloid song.',
      syntax: 'vocadb [query]',
      category: 'Search',
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a query.`);

    try {
      const { body } = await request.get('http://vocadb.net/api/songs').query({
        query: args.slice(0).join(' '),
        maxResults: 1,
        sort: 'FavoritedTimes',
        preferAccurateMatches: true,
        nameMatchMode: 'Words',
        fields: 'ThumbUrl,Lyrics'
      });
      if (!body.items.length) return ctx.send(`${this.bot.constants.emojis.ERROR} | No results found.`);
      const data = body.items[0];
      return ctx.send({
        title: `VocaDB | ${data.name}`,
        color: 0x86D2D0,
        url: `http://vocadb.net/S/${data.id}`,
        description: data.lyrics.length ? shorten(data.lyrics[0].value) : 'No lyrics avaliable.',
        fields: [{
          name: '» Artist',
          value: data.artistString,
          inline: true
        },
        {
          name: '» Published Date',
          value: this.bot.utils.getDate(data.publishDate),
          inline: true
        }]
      });
    } catch(error) {
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Oh, an error has occured: \`${error.message}\`. Try again later!`);
    }
  }
};