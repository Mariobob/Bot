module.exports = class VoiceConnection {
  constructor(bot, channel, player, results) {
    this.bot = bot;
    this.player = player;
    this.queue = [];
    this.channel = channel;
    this.volume = 100;

    this.queueSong(results);
    this.playNext();

    this.player.on('end', this.songEnd.bind(this));
  }

  playNext() {
    this.player.play(this.queue[0].track);
    this.channel.createMessage({
      embed: {
        title: '<a:music:466727792910794754> Now Playing',
        description: [
          `**${this.queue[0].info.title}**\n`,
          `❯ **Duration**: ${this.bot.utils.formatMusicDuration(this.queue[0].info.length)}`,
          `❯ **Stream?**: ${this.queue[0].info.isStream ? "Yes" : "No"}`
        ].join('\n'),
        color: this.bot.color
      }
    });
  }

  queueSong(results) {
    if (this.queue.length > 0) {
      this.channel.createMessage({
        embed: {
          title: '<a:music:466727792910794754> Added to the queue:',
          description: [
            `**${results[0].info.title}\n`,
            `❯ **Author**: ${results[0].info.author}`,
            `❯ **Duration**: ${this.bot.utils.formatMusicDuration(results[0].info.length)}`,
            `❯ **Position**: ${this.queue.length}`
          ].join('\n')
        }
      });
    }

    this.queue.push(results[0]);
  }

  songEnd() {
    this.queue.splice(0, 1);
    if (this.queue.length > 0) return this.playNext();
    this.player.stop();
    this.bot.leaveVoiceChannel(this.player.channelId);
    this.end();
  }

  end() {
    return this.channel.createMessage(":eject: | Thanks for using my music module! If you want more, why not queue some songs?");
  }

  clear() {
    this.queue = [];
    this.player.stop();
  }

  pause(bool) {
    this.player.pause(bool);
  }

  skip() {
    this.player.stop();
  }

  setVol(vol) {
    this.player.setVolume(vol);
    this.volume = vol;
  }

  get paused() {
    return this.player.paused;
  }

  get now() {
    return this.queue[0];
  }

  get position() {
    return this.player.state.position;
  }

  toJSON() {
    return {
      bot: this.bot,
      channel: this.channel,
      queue: this.queue,
      volume: this.volume,
      player: this.player,
      paused: this.paused,
      nowPlaying: this.now,
      position: this.position
    };
  }
};