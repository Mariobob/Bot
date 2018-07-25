const { Command } = require('../../structures');

module.exports = class ExecCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'exec',
      description: '!! Owner Only !!',
      syntax: 'exec [...code]',
      hidden: true,
      ownerOnly: true,
      category: 'Developers'
    });

    this.child = require('child_process');
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | Add some input to execute.`);

    this.child.exec(args.join(" "), (err, stdout, stderr) => {
      if (err) {
        return ctx.send({
          color: this.bot.color,
          description: `\`\`\`\n${stderr}\`\`\``
        });
      } else {
        return ctx.send({
          color: this.bot.color,
          description: `\`\`\`\n${stdout}\`\`\``
        });
      }
    });
  }
};