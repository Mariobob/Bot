const responses = [
  'Maybe someday.',
  'Nothing.',
  'Neither',
  "I don't think so.",
  'Yes',
  'Try asking again.'
];
const Command = require('../../structures').Command;

module.exports = class MagicConchCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'magic-conch',
      description: "Ask the Magic Conch a question!",
      syntax: 'magic-conch [question]',
      aliases: [
        'magicconch',
        'magicc',
        'conch'
      ],
      category: 'Fun',
      cooldown: 10
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | What do you want to say to the Magic Conch?`);

    return ctx.send(`:shell: | ${responses[Math.floor(Math.random() * responses.length)]}`);
  }
};