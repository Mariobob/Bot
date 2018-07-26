const { Structures: { extend } } = require('../structures');

module.exports = extend('Guild', Guild => class extends Guild {
  constructor(...args) {
    super(...args);
  }

  get settings() {
    return this.shard._client.r.table('guilds').get(this.id).run();
  }
});