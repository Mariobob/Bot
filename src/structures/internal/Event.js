module.exports = class RemEvent {
  constructor(bot, {
    event = null
  }) {
    this.bot = bot;
    this.event = event;
  }
};