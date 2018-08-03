const { Command } = require('../../structures');
const request = require('node-superfetch');
const { trimArray } = require('../../util/ArrayUtil');

module.exports = class NPMCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'npm',
      description: "Searches the Node Package Manager (NPM) registry for a package.",
      syntax: 'npm [prototype]',
      category: "Search",
      cooldown: 10
    });
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${ctx.bot.constants.emojis.ERROR} | You must provide a package.`);

    try {
      const { body } = await request.get(`https://registry.npmjs.com/${args[0]}`);
      if (body.time.unpublished) return ctx.send(`${ctx.bot.constants.emojis.ERROR} | Package \`${args[0]}\` has been unpublished.`);
      const version = body.versions[body['dist-tags'].latest];
      const maintainers = trimArray(body.maintainers.map(s => s.name));
      const deps = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
      return ctx.send({
        title: `Node Package Manager (NPM) | ${body.name}`,
        color: 0xCB0000,
        url: `https://npmjs.com/package/${args[0]}`,
        description: [
          `**${body.description || 'No description.'}**\n`,
          `» **Version**: v${body['dist-tags'].latest}`,
          `» **License**: ${body.license || 'No license.'}`,
          `» **Author**: ${body.author ? body.author.name : '???'}`,
          `» **Main File**: ${version.main || 'index.js'}`,
          `» **Dependencies**: ${deps && deps.length ? deps.join(', ') : 'None'}`,
          `» **Maintainers**: ${maintainers.join(', ')}`
        ].join('\n')
      });
    } catch(error) {
      throw error;
      return ctx.send(`${this.bot.constants.emojis.ERROR} | Oh, an error has occured: \`${error.message}\`. Try again later!`);
    }
  }
};