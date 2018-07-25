const fs = require('fs');

module.exports = class CommandStore {
  constructor(bot) {
    this.bot = bot;
  }

  async run() {
    const categories = await fs.readdirSync('./commands');

    for (let i = 0; i < categories.length; i++) {
      fs.readdir(`./commands/${categories[i]}`, (err, files) => {
        if (err) this.bot.log.error(err.stack);
        this.bot.log.info(`Loading ${files.length} commands (Category ${categories[i]})`);
        files.forEach((f) => {
          try {
            const Command = require(`../../commands/${categories[i]}/${f}`);
            const cmd = new Command(this.bot);

            if (!cmd.options.enabled) return;

            this.bot.cmds.set(cmd.options.command, cmd);

            this.bot.log.info(`Loaded command ${cmd.options.command}!`);
          } catch(err) {
            this.bot.log.error(err.stack);
          }
        });
      });
    }
  }
};