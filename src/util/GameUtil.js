const yes = [
  'yes',
  'ye',
  'y',
  'yus'
];
const no = [
  'no',
  'nu',
  'nah',
  'nope'
];

module.exports = class GameUtil {
  static async verify(bot, channel, user, time = 30e3) {
    let filter = (res) => {
      const value = res.content.toLowerCase();
      return res.author.id === user.id && (yes.includes(value) || no.includes(value));
    };

    const verify = await bot.collector.awaitMessage(channel.id, user.id, time, filter);
    if (!verify) return 0;
    const choice = verify.content.toLowerCase();
    if (yes.includes(choice)) return true;
    if (no.includes(choice)) return false;
    return false;
  }
};