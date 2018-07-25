const { Command } = require('../../structures');

module.exports = class EvalCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'eval',
      description: '!! Owner Only !!',
      syntax: 'eval [...code]',
      category: 'Developers',
      hidden: true,
      ownerOnly: true
    });

    this.util = require('util');
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Add some input to evaluate.`);

    let input = args.join(" ");
    const slient = input.includes('--slient');
    const asynchr = input.includes('return') || input.includes('await');

    if (slient) {
      input = input.replace('--slient', '');
    }

    let result;
    try {
      result = await (asynchr ? eval(`(async()=>{${input}})();`) : eval(input));

      if (typeof result !== 'string') {
        result = this.util.inspect(result, {
          depth: +!(this.util.inspect(result, { depth: 1 }).length > 1990)
        });
      }

      result = this.bot.constants.redact(result);
    } catch(err) {
      result = err.message;
    }

    if (slient) {
      return ctx.send(result);
    } else {
      return ctx.send({
        description: `\`\`\`js\n${result}\`\`\``,
        color: this.bot.color
      });
    }
  }
};