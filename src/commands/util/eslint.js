const { Linter } = require('eslint');
const Command = require('../../structures').Command;

module.exports = class ESLintCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'eslint',
      description: 'ESLintify your code.',
      syntax: 'eslint [code]',
      guildOnly: true,
      category: 'Utility'
    });

    this.linter = new Linter();
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide code.`);

    const output = this.linter.verify(args.slice(0).join(' '), {
      env: {
        es6: true,
        node: true
      },
      extends: 'eslint:recommended',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018
      }
    }, { filename: 'input.js' });

    if (output.length < 1) return ctx.send(`${this.bot.constants.emojis.SUCCESS} | You're code is fine by ESLint. :thumbsup:`);

    ctx.send({
      title: 'ESLint Error',
      description: 'An error has occured while running the code.',
      color: this.bot.color,
      fields: [{
        name: '❯ Message',
        value: output[0].message
      },
      {
        name: '❯ Location',
        value: `Line: ${output[0].line}\nColumn: ${output[0].column}`,
        inline: true
      },
      {
        name: '❯ Fatal',
        value: output[0].fatal ? "Yes" : "No",
        inline: true
      }]
    });
  }
};