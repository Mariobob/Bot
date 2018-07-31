const { Command } = require('../../structures');

module.exports = class EnableCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'enable',
      description: 'Enables a command if a command was disabled.',
      syntax: 'enable [command]',
      category: 'Settings',
      aliases: ['enable-command'],
      permissions: ['manageGuild']
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide 1 command or multiple commands.`);

    const gConfig = await this.bot.r.table('guilds').get(ctx.guild.id).run();
    args = this.bot.utils.removeDuplicates(args);

    if (args.some(c => !this.bot.cmds.has(c))) return ctx.send(`${this.bot.constants.emojis.ERROR} | The following commands are invalid.\n${args.filter((c) => !this.bot.cmds.has(c)).map(c => `**»** \`${c}\``).join('\n')}`);
    if (args.some(c => !gConfig.disabledCommands.includes(c))) return ctx.send(`${this.bot.constants.emojis.ERROR} | The following commands are not disabled.\n${args.filter((c) => !this.bot.cmds.has(c)).map(c => `**»** \`${c}\``).join('\n')}`);

    this.bot.r.table('guilds').get(ctx.guild.id).update({
      disabledCommands: gConfig.disabledCommands.indexOf(args, 1)
    }).run();
    return ctx.send(`:thinking: | The following commands has been enabled:\n${args.map(c => `**»** \`${ctx.getPrefix()}${c}\``).join('\n')}`);
  }
};