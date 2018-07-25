const Command = require('../../structures').Command;

module.exports = class PingCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'ping',
      description: 'Shows the shard/message latency.',
      syntax: 'ping',
      aliases: [
        'pong'
      ]
    });

    this.vowels = [
      'a',
      'e',
      'i',
      'o',
      'u'
    ];
  }

  getPing(ms) {
    if (ms == 1) return 'Fast af bois! :zap:';
    if (ms == 69) return '69ms... :thinking:';
    if (ms < 10) return 'Hi!';
    if (ms < 100) return 'Oh...';
    if (ms < 200) return 'Ok, over 200ms isn\'t bad, is it?';
    if (ms < 300) return 'aaaaa 300ms...';
    if (ms < 400) return '400ms isnt bad... I hope.';
    if (ms < 500) return 'Uhh, I might be slow but that\'s ok, right?';
    if (ms < 600) return 'aaaaaaaaaaaaaaaaa...';
    if (ms < 700) return 'uhh, Let me try to fix this...';
    if (ms < 800) return 'Ok, I can\'t help it. I say wait a bit!';
    if (ms < 900) return "Ok, I'm slow? I can't help it.";
    if (ms < 1000) return "Ok, all I have to say is: \"Blame Discord!\"";
    return 'I\'m slow today, amirite? :cry:';
  }

  execute(ctx) {
    let now = Date.now();

    ctx.channel.createMessage(`:ping_pong: | Pong...?`)
      .then(async(message) => {
        await message.delete();
        ctx.send(`:ping_pong: | P${this.vowels[Math.floor(Math.random() * this.vowels.length)]}ng! (**${this.getPing(Date.now() - now)}**)\n\t:diamond_shape_with_a_dot_inside: Shard (#${ctx.guild.shard.id}): \`${ctx.guild.shard.latency}ms\`\n\t:satellite_orbital: Message: \`${Date.now() - now}ms\``);
      });
  }
};