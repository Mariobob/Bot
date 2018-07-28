module.exports = class RemCommand {
  constructor(bot, {
    command = null,
    description = "No description?",
    syntax = "No syntax?",
    aliases = [],
    category = "General",
    guildOnly = false,
    nsfw = false,
    ownerOnly = false,
    enabled = true,
    cooldown = 3,
    hidden = false,
    children = []
  }) {
    this.bot = bot;
    this.options = {
      command, description, syntax,
      aliases, category, guildOnly,
      nsfw, ownerOnly, enabled,
      cooldown, hidden, children
    };
  }

  async execute(ctx, args) {}
};