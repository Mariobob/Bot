const fs = require('fs');

module.exports = class EventStore {
  constructor(bot) {
    this.bot = bot;
  }

  doEvent(event) {
    const doAsync = async(...args) => {
      try {
        await event.execute(...args);
      } catch(err) {
        this.bot.log.error(err.stack);
      }
    };

    this.bot.on(event.event, doAsync);
  }

  run() {
    fs.readdir('./events', (err, files) => {
      if (err) this.bot.log.error(err.stack);
      this.bot.log.info(`Loading ${files.length} events!`);
      files.forEach((f) => {
        const Event = require(`../../events/${f}`);
        const event = new Event(this.bot);

        this.bot.log.info(`Loaded the ${event.event} event~`);

        this.doEvent(event);
      });
    });
  }

  toJSON() {
    return {
      bot: this.bot
    };
  }
};