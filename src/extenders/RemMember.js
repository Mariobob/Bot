const { Structures } = require('../structures');

module.exports = Structures.extend('Member', (Member) => class extends Member {
  constructor(...args) {
    super(...args);
  }

  get coins() {
    const uConfig = this.guild.shard.client.r.table('users').get(this.id).run();
    return uConfig.coins || 0;
  }

  get settings() {
    return this.guild.shard.client.r.table('users').get(this.id).run();
  }
});