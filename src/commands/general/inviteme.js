const Command = require('../../structures').Command;

module.exports = class InviteMeCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'inviteme',
      description: "Grabs my invite/discord links.",
      syntax: 'inviteme',
      cooldown: 5
    });
  }

  execute(ctx) {
    return ctx.send({
      title: "Here are my invite links!",
      description: [
        `**Invite Me!**: ${this.bot.gatherInvite(0)}`,
        `**Discord Server**: https://discord.gg/gzPtR34`
      ].join("\n"),
      color: this.bot.color
    });
  }
};