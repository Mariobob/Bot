module.exports = class CommandContext {
  constructor(bot, msg) {
    Object.assign(this, msg);
    this.bot = bot;
    this.prefix = null;
  }

  get guild() {
    return this.channel.guild;
  }

  get member() {
    return this.guild && this.author && this.guild.members.get(this.author.id) || null;
  }

  send(content) {
    if (content instanceof Object) {
      this.channel.createMessage({
        embed: content
      });
    } else {
      this.channel.createMessage(content);
    }
  }

  sendCode(lang, content) {
    return this.send(`\`\`\`${lang || null}\n${content}\`\`\``);
  }

  reply(content) {
    return this.send(`<@${this.author.id}>, ${content}`);
  }

  async setPrefix(prefix) {
    this.prefix = prefix;
  }

  getPrefix() {
    return this.prefix;
  }
};