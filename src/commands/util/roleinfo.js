const Command = require('../../structures').Command;

module.exports = class RoleInformationCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'roleinfo',
      aliases: [
        'role-information',
        'roleinformation',
        'role-info',
        'role'
      ],
      description: 'Gives information about an role.',
      syntax: 'roleinfo [role]',
      category: 'Utility',
      guildOnly: true,
      enabled: false
    });
  }

  execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a role.`);
    this.bot.utils.resolveRole(args[0], ctx.guild)
      .then((role) => {
        return ctx.send({
          title: `Role ${role.name} (<@&${role.id}>)`,
          color: role.color,
          fields: [{
            name: '❯ ID',
            value: role.id
          },
          {
            name: '❯ Position',
            value: role.position - 1,
            inline: true
          },
          {
            name: '❯ Hoisted',
            value: role.hoist ? "Yes" : "No",
            inline: true
          },
          {
            name: '❯ Mentionable',
            value: role.mentionable ? 'Yes' : "No",
            inline: true
          },
          {
            name: '❯ Managed',
            value: role.managed ? 'Yes' : "No",
            inline: true
          },
          {
            name: '❯ Role Color',
            value: `#${(parseInt(role.color)).toString(16)}`,
            inline: true
          }]
        });
      }).catch(e => this.bot.log.error(e.stack));
  }
};