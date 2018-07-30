const Languages = {
  'auto': 'Automatic',
  'af': 'Afrikaans',
  'sq': 'Albanian',
  'am': 'Amharic',
  'ar': 'Arabic',
  'hy': 'Armenian',
  'az': 'Azerbaijani',
  'eu': 'Basque',
  'be': 'Belarusian',
  'bn': 'Bengali',
  'bs': 'Bosnian',
  'bg': 'Bulgarian',
  'ca': 'Catalan',
  'ceb': 'Cebuano',
  'ny': 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  'co': 'Corsican',
  'hr': 'Croatian',
  'cs': 'Czech',
  'da': 'Danish',
  'nl': 'Dutch',
  'en': 'English',
  'eo': 'Esperanto',
  'et': 'Estonian',
  'tl': 'Filipino',
  'fi': 'Finnish',
  'fr': 'French',
  'fy': 'Frisian',
  'gl': 'Galician',
  'ka': 'Georgian',
  'de': 'German',
  'el': 'Greek',
  'gu': 'Gujarati',
  'ht': 'Haitian Creole',
  'ha': 'Hausa',
  'haw': 'Hawaiian',
  'iw': 'Hebrew',
  'hi': 'Hindi',
  'hmn': 'Hmong',
  'hu': 'Hungarian',
  'is': 'Icelandic',
  'ig': 'Igbo',
  'id': 'Indonesian',
  'ga': 'Irish',
  'it': 'Italian',
  'ja': 'Japanese',
  'jw': 'Javanese',
  'kn': 'Kannada',
  'kk': 'Kazakh',
  'km': 'Khmer',
  'ko': 'Korean',
  'ku': 'Kurdish (Kurmanji)',
  'ky': 'Kyrgyz',
  'lo': 'Lao',
  'la': 'Latin',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'lb': 'Luxembourgish',
  'mk': 'Macedonian',
  'mg': 'Malagasy',
  'ms': 'Malay',
  'ml': 'Malayalam',
  'mt': 'Maltese',
  'mi': 'Maori',
  'mr': 'Marathi',
  'mn': 'Mongolian',
  'my': 'Myanmar (Burmese)',
  'ne': 'Nepali',
  'no': 'Norwegian',
  'ps': 'Pashto',
  'fa': 'Persian',
  'pl': 'Polish',
  'pt': 'Portuguese',
  'ma': 'Punjabi',
  'ro': 'Romanian',
  'ru': 'Russian',
  'sm': 'Samoan',
  'gd': 'Scots Gaelic',
  'sr': 'Serbian',
  'st': 'Sesotho',
  'sn': 'Shona',
  'sd': 'Sindhi',
  'si': 'Sinhala',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'so': 'Somali',
  'es': 'Spanish',
  'su': 'Sundanese',
  'sw': 'Swahili',
  'sv': 'Swedish',
  'tg': 'Tajik',
  'ta': 'Tamil',
  'te': 'Telugu',
  'th': 'Thai',
  'tr': 'Turkish',
  'uk': 'Ukrainian',
  'ur': 'Urdu',
  'uz': 'Uzbek',
  'vi': 'Vietnamese',
  'cy': 'Welsh',
  'xh': 'Xhosa',
  'yi': 'Yiddish',
  'yo': 'Yoruba',
  'zu': 'Zulu'
};
const reRegExpExpChar = /[\\^$.*+?()[\]{}|]/g;
const regHasRegExpChar = new RegExp(reRegExpExpChar.source);

module.exports = class RemUtil {
  constructor(bot) {
    this.bot = bot;
  }

  escapeRegExp(str) {
    return (str && regHasRegExpChar.test(str)) ? str.replace(reRegExpExpChar, '\\$&') : str;
  }

  formatMusicDuration(ms) {
    const sec = Math.floor((ms / 1000) % 60);
    const min = Math.floor((ms / 1000 / 60) % 60);
    const hrs = Math.floor(ms / 1000 / 60 / 60);
    return `${(hrs < 10 ? '0' : '')}${hrs}:${(min < 10 ? '0' : '')}${min}:${(sec < 10 ? '0' : '')}${sec}`;
  }

  formatReminderDuration(msec) {
    const days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    const mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    const sec = Math.floor(msec / 1000);

    let timestr = "";

    if (days > 0) timestr += `${days} days, `;
    if (hours > 0) timestr += `${hours} hours, `;
    if (mins > 0) timestr += `${mins} minutes, and `;
    if (sec > 0) timestr += `${sec} seconds`;

    return timestr;
  }

  duration(msec) {
    const days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    const mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    const sec = Math.floor(msec / 1000);

    let timestr = "";

    if (days > 0) timestr += `${days}d`;
    if (hours > 0) timestr += `${hours}h`;
    if (mins > 0) timestr += `${mins}m`;
    if (sec > 0) timestr += `${sec}s`;

    return timestr;
  }

  getDate(d) {
    return new Date().toDateString(d);
  }

  base64(text, mode = 'encode') {
    switch (mode.toString()) {
      case 'encode':
        return Buffer.from(text).toString('base64');
        break;
      case 'decode':
        return Buffer.from(text, 'base64').toString('utf8') || null;
        break;
      default:
        throw new SyntaxError(`Mode ${mode} not supported.`);
        break;
    }
  }

  delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  resolveTrack(query) {
    return new Promise((resolve, reject) => {
      this.bot.request
        .get(`http://${this.bot.config.lavalink.nodes[0].host}:${this.bot.config.lavalink.nodes[0].ws}/loadtracks`)
        .query({
          identifier: query
        })
        .set('Authorization', this.bot.config.lavalink.nodes[0].password)
        .then(res => resolve(res.body))
        .catch(error => reject(error));
    });
  }

  resolveChannel(channel, guild) {
    return new Promise((resolve, reject) => {
      if (/^\d+$/.test(channel)) {
        if (guild) {
          if (!guild.channels.has(channel)) reject();
          resolve(guild.channels.get(channel));
        } else {
          const channel = channel in this.bot.channelGuildMap && this.bot.guilds.get(this.channel.channelGuildMap[channel]).channels.get(channel);
          if (channel) return resolve(channel);
        }
      } else if (/^<#(\d+)>$/.test(channel)) {
        const match = channel.match(/^<#(\d+)>$/);
        if (guild) {
          if (!guild.channels.has(match[1])) reject();
          resolve(guild.channels.get(match[1]));
        } else {
          const channel = match[1] in this.bot.channelGuildMap && this.bot.guilds.get(this.bot.channelGuildMap[match[1]]).channels.get(channel);
          if (channel) return resolve(channel);
        }
      } else if (guild) {
        const channel = guild.channels.filter((channel) => channel.name.toLowerCase().includes(channel.toLowerCase()));
        if (channel.length > 0) return resolve(channels[0]);
      } 

      reject();
    });
  }

  resolveGuild(query) {
    return new Promise((resolve, reject) => {
      if (/^\d+$/.test(query)) {
        const guild = this.bot.guilds.get(query);
        if (guild) return resolve(guild);
      } else {
        const guilds = this.bot.guilds.filter((guild) => guild.name.toLowerCase().includes(query.toLowerCase()));
        if (guild.lengths > 0) return resolve(guilds[0]);
      }

      reject();
    });
  }

  resolveUser(query) {
    return new Promise((resolve, reject) => {
      if (/^\d+$/.test(query)) {
        const user = this.bot.users.get(query);
        if (user) return resolve(user);
      } else if (/^<@!?(\d+)>$/.test(query)) {
        const match = query.match(/^<@!?(\d+)>$/);
        const user = this.bot.users.get(match[1]);
        if (user) return resolve(user);
      } else if (/^(.+)#(\d{4})$/.test(query)) {
        const match = query.match(/^(.+)#(\d{4})$/);
        const users = this.bot.users.filter((user) => user.username === match[1] && Number(user.discriminator) === Number(match[2]));
        if (users.length > 0) return resolve(users[0]);
      } else {
        const users = this.bot.users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
        if (users.length > 0) return resolve(users[0]);
      }

      reject();
    });
  }

  resolveRole(query, guild) {
    return new Promise((resolve, reject) => {
      if (/^\d+$/.test(query)) {
        const role = guild.roles.get(query);
        if (role) return resolve(query);
      } else if (/^<@&(\d+)>$/.test(query)) {
        const match = query.match(/^<@&(\d+)>$/);
        const role = guild.roles.get(match[1]);
        if (role) return resolve(query);
      } else {
        const role = guild.roles.filter((role) => role.name.toLowerCase().includes(query.toLowerCase()));
      }

      reject();
    });
  }

  list(arr, conj = 'and') {
    const len = arr.length;
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
  }

  post() {
    // DBL (More soon TM)
    require('node-superfetch').post(`https://discordbots.org/api/bots/${this.bot.user.id}/stats`)
      .set('Authorization', this.bot.config.api_keys.oliyBots)
      .send({
        server_count: this.bot.guilds.size,
        shard_count: this.bot.shards.size
      }).end();
  }

  handleDatabaseError(e, ctx) {
    if (ctx) return ctx.send(`${this.bot.constants.emojis.ERROR} | An error has occured while querying something to the database! Try again later~`);
    this.bot.log.custom('DATABASE', e.stack);
  }

  updateBalance(author, bal) {
    return new Promise((res, rej) => {
      this.bot.r.table('users').get(author.id).run((error, settings) => {
        if (error) return rej(error);
        if (settings.coins) {
          this.bot.r.table('users').get(author.id).update({
            coins: settings.coins + bal
          }).run((error) => {
            if (error) return rej(error);
            res(settings.coins + bal);
          });
        } else {
          this.bot.r.table('users').get(author.id).update({
            coins: bal
          }).run((error) => {
            if (error) return rej(error);
            res(bal);
          });
        }
      });
    });
  }

  formatMessage({ message, member, guild }) {
    return message
      .replace('$(user)', `${member.user.username}#${member.user.discriminator}`)
      .replace('$(user.name)', member.user.username)
      .replace('$(user.id)', member.user.id)
      .replace('$(user.discrim)', member.user.discriminator)
      .replace('$(user.mention)', `<@${member.user.id}>`)
      .replace('$(user.avatar)', member.user.avatar ? member.user.avatarURL : member.user.defaultAvatarURL)
      .replace('$(guild)', guild.name)
      .replace('$(guild.id)', guild.id)
      .replace('$(guild.members)', guild.memberCount)
      .replace('$(guild.roles)', guild.roles.size)
      .replace('$(guild.emojis)', guild.emojis.length);
  }

  formatMemory(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;

    if (kb < 1024) return kb.toFixed().toLocaleString() + 'KB';
    if (kb > 1024 && mb < 1024) return mb.toFixed().toLocaleString() + 'MB';
    return gb.toFixed().toLocaleString() + 'GB';
  }

  getLanguage(lang) {
    if (!lang) return false;
    lang = lang.toLowerCase();

    if (Languages[lang]) return lang;

    const keys = Object.keys(Languages).filter(key => {
      if (typeof Languages[key] !== 'string') return false;

      return Languages[key].toLowerCase() === lang;
    });

    return keys[0] || false;
  }

  supported(lang) {
    return Boolean(this.getLanguage(lang));
  }

  getPlayer(channelId, guild) {
    const player = this.bot.voiceConnections.get(guild.id);
    if (player) return Promise.resolve(player);
    return this.bot.joinVoiceChannel(channelId);
  }

  letterTranslate(text, dict, join = '') {
    if (typeof text !== 'string') throw new TypeError("'text' must be a string. ;w;");
    if (typeof dict !== 'object') throw new TypeError("'dict' must be an object. ;w;");
    return text.split('').map(letter => dict[letter] || letter).join(join);
  }

  today(timeZone) {
    const now = new Date();
    if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }

  tomorrow(timeZone) {
    const today = this.today(timeZone);
    today.setDate(today.getDate() + 1);
    return today;
  }
};