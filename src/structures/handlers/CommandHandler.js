const Context = require('../internal/Context');
const { Collection } = require('eris');
const i18n = require('i18n');

module.exports = class CommandHandler {
  constructor(bot) {
    this.bot = bot;
    this.cooldowns = new Collection();
  }

  async handleCommand(msg) {
    if (msg.author.bot || !this.bot.ready) return;

    // Guild / User configuration
    const gConfig = await this.bot.r.table('guilds').get(msg.channel.guild.id).run();
    const uConfig = await this.bot.r.table('users').get(msg.author.id).run();

    if (!gConfig) return this.newGuild(msg.channel.guild);
    if (!uConfig) return this.newUser(msg.author);

    let prefix = new RegExp(`^<@!?${this.bot.user.id}> |^${this.bot.utils.escapeRegExp('rem ')} |^${this.bot.utils.escapeRegExp(gConfig.prefix)}`)
      .exec(msg.content);
    
    if (!prefix) return;

    const ctx = new Context(this.bot, msg);
    ctx.setPrefix(gConfig.prefix);

    const args = msg.content.slice(prefix[0].length).trim().split(/ +/g);
    const command = args.shift();
    const cmd = this.bot.cmds.filter((c) => c.options.command === command || c.options.aliases.includes(command));

    if (cmd.length > 0) {
      if (cmd[0].options.guildOnly && ctx.guild.type === 1) return ctx.send(`${this.bot.constants.emojis.ERROR} | You're not in a guild.`);
      if (cmd[0].options.ownerOnly && !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You don't own this bot.`);
      if (cmd[0].options.nsfw && !msg.channel.nsfw) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must be in an nsfw-marked channel.`);

      if (!this.cooldowns.has(cmd[0].options.command)) {
        this.cooldowns.set(cmd[0].options.command, new Collection());
      }

      const now = Date.now();
      const timestamps = this.cooldowns.get(cmd[0].options.command);
      const cooldownAmount = (cmd[0].options.cooldown) * 1000;

      if (!timestamps.has(msg.author.id)) {
          timestamps.set(msg.author.id, now);
          setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
      }
      else {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return ctx.send(`${this.bot.constant.emojis.MEMO} | You have \`${timeLeft.toFixed()} second${timeLeft > 1 ? "s" : ""}\` before execute the \`${cmd[0].options.command}\` command.`);
        }

        timestamps.set(msg.author.id, now);
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
      }

      try {
        await cmd[0].execute(ctx, args);
        this.bot.log.custom(msg.channel.type === 1 ? 'DM' : ctx.guild.name, `User ${ctx.author.username}#${ctx.author.discriminator} ran the command ${command ? cmd[0].options.command : command}~`);
      } catch(err) {
        this.bot.log.error(err.stack);
        return ctx.send(`${this.bot.constants.emojis.ERROR} | The command has failed to execute, the incident has been logged.`);
      }
    }
  }

  newGuild(guild) {
    this.bot.r
      .table('guilds')
      .insert({
        id: guild.id,
        prefix: this.bot.config.prefix,
        disabledCommands: [],
        greetings: {
          message: ':wave: | Welcome $(user) to $(guild)!',
          enabled: false,
          channel: null
        },
        farewell: {
          message: ':cry: | Goodbye $(user)... :<',
          enabled: false,
          channel: null
        },
        logging: {
          channel: null,
          enabled: false
        }
      })
      .run();
    this.bot.log.info(`Created the 'guilds' database for guild ${guild.name}`);
  }

  newUser(author) {
    this.bot.r
      .table('users')
      .insert({
        id: author.id,
        coins: 0,
        profile: {
          description: "No description provided.",
          waifu: null,
          mal: null,
          osu: null
        },
        badges: {
          isBotOwner: false,
          isDeveloper: false,
          isStaff: false,
          isDonator: false,
          isTrusted: false,
          isNormal: true,
          named: {
            bot_owner: ':sparkling_heart: Bot Owner',
            developer: '<:developer:469470655209930773> Developer',
            staff: '<:staff:469470655289753600> Staff Member',
            donator: ':smile: Donator',
            trusted: '<:trusted:469470654836768779> Trusted',
            normal: ':heart: Normal User'
          }
        },
        marriages: {
          to: null,
          isMarried: false
        },
        upvoter: false,
        inventory: {
          ring: 0,
          pickaxe: 0
        },
        donator: false
      }).run();
    this.bot.log.info(`Created the 'users' database for user ${author.username}!`);
  }
};