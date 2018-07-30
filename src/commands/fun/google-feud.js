const Command = require('../../structures').Command;
const questions = require('../../assets/json/google-feud.json');

module.exports = class GoogleFeudCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'google-feud',
      description: 'Play Google Feud with Rem!',
      syntax: 'google-feud',
      guildOnly: true,
      category: 'Fun',
      cooldown: 30
    });

    this.question = questions[Math.floor(Math.random() * questions.length)];
    this.playing = new Set();
    this.snek = require('snekfetch');
  }

  async execute(ctx) {
    if (this.playing.has(ctx.channel.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | Only one Google Feud fight can occuring per channel. ;w;`);
    this.playing.add(ctx.channel.id);

    try {
      const suggestions = await this.fetch(this.question);
      if (!suggestions) ctx.send(`${this.bot.constants.emojis.ERROR} | No results found.`);

      const display = new Array(suggestions.length).fill('???');
      let tries = 3;

      while (display.includes('???') && tries) {
        let embed = {
          title: `${this.question}...?`,
          description: 'Type the choice you think is asked _without_ the question.',
          footer: {
            icon_url: ctx.author.avatarURL,
            text: `${tries} ${tries === 1 ? "try" : "tries"} left.`
          },
          color: this.bot.color,
          fields: []
        };

        for (let i = 0; i < suggestions.length; i++) embed.fields.push({
          name: `❯ ${10000 - (i * 1000)}`,
          value: display[i],
          inline: true
        });
        ctx.send(embed);

        const msg = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 30e3, res => res.author.id === ctx.author.id);
        if (!msg) {
          await ctx.send(`${this.bot.constants.emojis.MEMO} | Times up!`);
          break;
        }

        const choice = msg.content.toLowerCase();
        if (suggestions.includes(choice)) display[suggestions.indexOf(choice)] = choice;
        else --tries;
      }

      this.playing.delete(ctx.channel.id);
      if (!display.includes('???')) return ctx.send(":tada: | You win! Nice job.");
      return ctx.send(':cry: | Better next time.');
    } catch(error) {
      this.playing.delete(ctx.channel.id);
      return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured: \`${error.message}\`. Try again later`);
    }
  }

  async fetch(que) {
    const { body } = await this.snek.get('https://suggestqueries.google.com/complete/search').query({ client: 'firefox', q: que });
    const suggestions = JSON.parse(body)[1].filter(s => s.toLowerCase() !== que.toLowerCase());
    if (!suggestions.length) return null;
		return suggestions.map(suggestion => suggestion.toLowerCase().replace(que.toLowerCase(), '').trim());
  }
};