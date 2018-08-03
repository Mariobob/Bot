const request = require('node-superfetch');

module.exports = class WebhookClient {
  constructor(bot, options = { url }) {
    this.bot = bot;
    this.url = options.url;
  }

  send(content) {
    if (content instanceof Object) {
      request
        .post(this.url)
        .send({
          embeds: [content]
        })
        .end();
    } else {
      request
        .post(this.url)
        .send({
          content
        })
        .end();
    }
  }
};