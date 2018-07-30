const Command = require('../../structures').Command;
const request = require('node-superfetch');

module.exports = class ChangelogCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'changelog',
      description: 'Get the 5 latest commits from Rem\'s GitHub repository.',
      syntax: 'changelog',
      aliases: [
        'releases'
      ]
    });
  }

  async execute(ctx) {
    const { body } = await request.get('https://api.github.com/repos/RemBotTeam/Bot/commits');

    const commits = body.slice(0, 5);
    return ctx.send({
      title: 'RemBot | Changelog',
      description: commits.map((commit) => {
        let hash = `**»** [\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
        return `${hash} ${commit.commit.message.split('\n')[0]} **—>** ${commit.author.login}`;
      }).join('\n'),
      color: this.bot.color
    });
  }
};