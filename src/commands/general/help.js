const Command = require('../../structures').Command;

module.exports = class HelpCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'help',
      description: "Gives full documentation of Rem or gives documentation about an command/alias.",
      syntax: 'help [command]',
      aliases: [
        'halp',
        'h',
        'commands',
        'cmds',
        '?'
      ],
      cooldown: 5
    });

    this.categories = {};
  }

  async execute(ctx, args) {
    if (!args[0]) {
      this.bot.cmds
        .filter(c => !c.options.hidden)
        .forEach((command) => {
          if (!(command.options.category in this.categories)) this.categories[command.options.category] = [];
          this.categories[command.options.category].push(command.options.command);
        });

      return ctx.send({
        title: 'RemBot | Commands',
        description: `<a:blobwiggling:426425105757765632> Guild Prefix: ${ctx.getPrefix()}\n<:blobThonk:461309895971438602> To get on a command, please do \`${ctx.prefix}help [command]\` or \`@${this.bot.user.username}#${this.bot.user.discriminator} help [command]\``,
        color: this.bot.color,
        footer: {
          icon_url: ctx.author.avatarURL,
          text: `Commands: ${this.bot.cmds.filter(c => !c.options.hidden).length} // Love you guys <3`
        },
        fields: Object.keys(this.categories).map((c) => ({
          name: `❯ ${c in this.bot.constants.help ? this.bot.constants.help[c] : ":question:"} ${c} [${this.categories[c].length}]`,
          value: `\`${this.categories[c].join("`, `")}\``
        }))
      });
    }

    const command = this.bot.cmds.filter((c) => c.options.command === args[0] || c.options.aliases.includes(args[0]) && !c.options.hidden);

    if (command.length > 0) {
      return ctx.send({
        title: `Command ${command[0].options.command}`,
        description: `**${command[0].options.description}**`,
        fields: [{
          name: '❯ Syntax',
          value: `${ctx.getPrefix()}${command[0].options.syntax}`,
          inline: true
        },
        {
          name: '❯ Category',
          value: command[0].options.category,
          inline: true
        },
        {
          name: '❯ Guild Only?',
          value: command[0].options.guildOnly === true ? "Yes" : "No",
          inline: true
        },
        {
          name: '❯ Owner Only?',
          value: command[0].options.ownerOnly === true ? "Yes" : "No",
          inline: true
        },
        {
          name: '❯ NSFW Only?',
          value: command[0].options.nsfw === true ? "Yes" : "No",
          inline: true
        }],
        color: this.bot.color
      });
    }
  }
};