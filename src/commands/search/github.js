const { Command } = require('../../structures');
const request = require('node-superfetch');

module.exports = class GitHubCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'github',
      description: "Searches an repo or a user on GitHub.",
      syntax: "github ['user'/'repo'] [user] [repo]",
      category: 'Search',
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a \`user\` or \`repo\` argument.`);

    switch (args[0].toLowerCase()) {
      case "user": {
        if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a user from GitHub.`);

        const { body } = await request.get(`https://api.github.com/users/${args[1]}`);

        ctx.send({
          title: `User ${body.login} (${body.id})`,
          color: 0xFFFFFF,
          url: body.html_url,
          description: [
            `**${body.bio}**\n`,
            `» **Site Administration of GitHub**: ${body.site_admin}`,
            `» **Type**: ${body.type}`,
            `» **Followers [Size]**: ${body.followers.toLocaleString()}`,
            `» **Following [Size]**: ${body.following.toLocaleString()}`,
            `» **Created At**: ${this.bot.utils.getDate(body.created_at)}`
          ].join('\n')
        });
      } break;
      case "repo": {
        if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide the owner of the repository.`);
        if (!args[2]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide the repository name.`);

        const { body } = await request.get(`https://api.github.com/repos/${args[1]}/${args[2]}`);

        ctx.send({
          title: `Repository ${body.full_name} (${body.id})`,
          color: 0xFFFFFF,
          url: body.html_url,
          description: [
            `**${body.description}**\n`,
            `» **Private Repository**: ${body.private ? "Yes" : "No"}`,
            `» **Repository Size**: ${this.bot.utils.formatMemory(body.size)}`,
            `» **Stars**: ${body.stargazers_count.toLocaleString()}`,
            `» **Watchers**: ${body.watchers_count.toLocaleString()}`,
            `» **Forks**: ${body.forks.toLocaleString()}`,
            `» **Repository Language**: ${body.language || 'No language.'}`,
            `» **License**: ${body.license.name}`
          ].join('\n')
        });
      } break;
    }
  }
};