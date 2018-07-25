const responses = [
  "<:remOnline:457289010037915660> It is certain.",
  "<:remOnline:457289010037915660> As I see it, yes!",
  "<:remOnline:457289010037915660> It is decidedly so.",
  "<:remOnline:457289010037915660> Most likely...",
  "<:remOnline:457289010037915660> Without a doubt!",
  "<:remOnline:457289010037915660> Yes, definitely.",
  "<:remOnline:457289010037915660> Yes~",
  "<:remOnline:457289010037915660> You may rely on it.",
  "<:remOnline:457289010037915660> Signs point to yes.",
  "<:remIdle:457289009912217612> Reply hazy try again later.",
  "<:remIdle:457289009912217612> Ask again later.",
  "<:remIdle:457289009912217612> Better not tell you now.",
  "<:remIdle:457289009912217612> Cannot predict now.",
  "<:remIdle:457289009912217612> Concentrate and ask again later.",
  "<:remDND:457289032330772502> Don't count on it.",
  "<:remDND:457289032330772502> My reply is no.",
  "<:remDND:457289032330772502> My sources say no.",
  "<:remDND:457289032330772502> Outlook not so good...",
  "<:remDND:457289032330772502> Very doubtful..."
];
const Command = require('../../structures').Command;

module.exports = class Magic8Command extends Command {
  constructor(bot) {
    super(bot, {
      command: 'magic8',
      description: 'Ask the intelligent Magic 8 ball a question?',
      syntax: 'magic8 [question]',
      category: 'Fun',
      cooldown: 15,
      aliases: [
        '8ball',
        '8-ball'
      ]
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must ask the 8ball a question.`);

    // Response
    const answer = responses[Math.floor(Math.random() * responses.length)];
    return ctx.send({
      description: [
        `You> ${args.join(" ")}`,
        `8ball> ${answer}`
      ].join("\n"),
      color: this.bot.color
    });
  }
};