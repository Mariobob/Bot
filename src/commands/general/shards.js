const Command = require('../../structures').Command;

module.exports = class ShardsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'shards',
      description: 'Grabs shard information',
      syntax: 'shards',
      aliases: [
        'shardinfo'
      ],
      cooldown: 5
    });
  }

  execute(ctx) {
    ctx.channel.createMessage(`${this.bot.constants.emojis.MEMO} | Grabbing shard information...`)
      .then(async(m) => {
        let shards = '';

        this.bot.shards.map(s => {
          if (ctx.guild.shard.id === s) shards += `[#${s.id}]: Current Shard`;
          shards += `[#${s.id}]: Latency: ${s.latency}ms | Status: ${s.status}`;
        });

        let current = ctx.guild.shard;
        await m.delete();

        return ctx.send({
          title: "RemBot | Shard Information",
          fields: [{
            name: "This Guild's Shard",
            value: `[#${current.id}]: Latency: ${current.latency}ms | Status: ${current.status}`
          },
          {
            name: 'All Shards',
            value: shards
          }],
          color: this.bot.color
        });
      });
  }
};