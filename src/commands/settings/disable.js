const Command = require('../../structures').Command;

module.exports = class DisableCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'disable',
      description: 'Disables 1 command or more commands.',
      syntax: 'disable [command]',
      aliases: [
        'disable-command'
      ],
      permissions: [
        'manageGuild'
      ],
      category: 'Settings',
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide 1 command or multiple commands.`);
    
    const gConfig = await this.bot.r.table('guilds').get(ctx.guild.id).run();
    args = this.bot.utils.removeDuplicates(args);
    args = args.filter((c) => !gConfig.disabledCommands.includes(c));

    if (args.some(c => !this.bot.cmds.has(c))) return ctx.send(`${this.bot.constants.emojis.ERROR} | The following commands are invalid.\n${args.filter((c) => !this.bot.cmds.has(c)).map(c => `**»** \`${c}\``).join('\n')}`);

    this.bot.r.table('guilds').get(ctx.guild.id).update({
      disabledCommands: gConfig.disabledCommands.concat(args)
    }).run();
    return ctx.send(`:thinking: | The following commands has been disabled:\n${args.map(c => `**»** \`${ctx.getPrefix()}${c}\``).join('\n')}`);
  }
};