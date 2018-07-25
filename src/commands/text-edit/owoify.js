const Command = require('../../structures').Command;
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

module.exports = class OwOifyCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'owoify',
      description: 'OwO?',
      syntax: 'owoify [text]',
      category: 'Text Edit'
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | OwO? (Provide text to owoify ur message.)`);
    return ctx.send(this.awoo(args.join(' ')));
  }

  awoo(text) {
    return text
    .replace(/(?:r|l)/g, 'w')
    .replace(/(?:R|L)/g, 'W')
    .replace(/n([aeiou])/g, 'ny$1')
    .replace(/N([aeiou])/g, 'Ny$1')
    .replace(/N([AEIOU])/g, 'NY$1')
    .replace(/ove/g, 'uv')
    .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
      .trim();
  }
};