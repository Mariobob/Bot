const Command = require('../../structures').Command;

module.exports = class GreetingsCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'greetings',
      description: 'This is where you can set your welcomes to people.',
      syntax: 'greetings ["set"/"list"/"keys"/"variables"] ["channel"/"message"/"enable"] [value]',
      category: 'Settings',
      guildOnly: true
    });

    this.filter = (m) => ['yes', 'y', 'no', 'n'].includes(m.content.toLowerCase());
  }

  async execute(ctx, args) {
    if (!args[0]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide an argument.`);
    if (!ctx.member.permission.has('manageGuild') || !this.bot.isOwner(ctx.author.id)) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must have the **\`Manage Guild\`** permission to execute this.`);

    if (args[0].toLowerCase() === 'set') {
      if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a key. View \`${ctx.prefix}greetings keys\` to see what the current keys are.`);
      if (!args[2]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a value. View \`${ctx.prefix}greetings variables\` to see what the current variables are.`);

      if (args[1].toLowerCase() === 'channel') {
        this.bot.utils.resolveChannel(args[2], ctx.guild)
          .then(async(c) => {
            ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure that you want to receive greeting messages in <#${c.id}>?\nType __y__es or __n__o. You have 60 seconds to decide.`);
            const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 60e3, this.filter);

            if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

            if (['no', 'n'].includes(message.content.toLowerCase())) {
              return ctx.send(`${this.bot.constants.emojis.ERROR} | You will not receive greeting messages in <#${c.id}>.`);
            } else {
              this.bot.r.table('guilds').get(ctx.guild.id).update({
                greetings: {
                  channel: c.id
                }
              }).run((error) => {
                if (error) return this.bot.utils.handleDatabaseError(error);
                return ctx.send(`${this.bot.constants.emojis.SUCCESS} | You will receive greeting messages in <#${c.id}>.`);
              });
            }
          });
      } else if (args[1].toLowerCase() === 'enabled') {
        let enabled;
        if (args[2].toLowerCase() === 'true') enabled = true;
        if (args[2].toLowerCase() === 'false') enabled = false;

        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna ${enabled === true ? "enable" : "disable"} greeting messages?\nType __y__es or __n__o. You have 60 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 60e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.ERROR} | You will not ${enabled === true ? "enable" : "disable"} greeting messages.`);
        } else {
          this.bot.r.table('guilds').get(ctx.guild.id).update({
            greetings: {
              enabled
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | You have ${enabled === true ? "enabled" : "disabled"} greeting messages.`);
          });
        }
      } else if (args[1].toLowerCase() === 'message') {
        ctx.send(`${this.bot.constants.emojis.MEMO} | Are you sure you wanna set \`${args.slice(2).join(" ")}\` as your greeting message?\nType __y__es or __n__o. You have 60 seconds to decide.`);
        const message = await this.bot.collector.awaitMessage(ctx.channel.id, ctx.author.id, 60e3, this.filter);

        if (!message) return ctx.send(`${this.bot.constants.emojis.ERROR} | Prompt timed out.`);

        if (['no', 'n'].includes(message.content.toLowerCase())) {
          return ctx.send(`${this.bot.constants.emojis.ERROR} | Message \`${args.slice(2).join(" ")}\` will not be set.`);
        } else {
          this.bot.r.table('guilds').get(ctx.guild.id).update({
            greetings: {
              message: args.slice(2).join(" ")
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | The message has been set to \`${args.slice(2).join(" ")}\`.`);
          });
        }
      }
    } else if (args[0].toLowerCase() === 'list') {
      this.bot.r.table('guilds').get(ctx.guild.id).run((error, gConfig) => {
        if (error) return this.bot.utils.handleDatabaseError(error);
        return ctx.sendCode('md', `# Current "Greetings" Settings for ${ctx.guild.name}:\nEnabled: ${gConfig.greetings.enabled}\nMessage: ${gConfig.greetings.message}\nChannel (ID): ${gConfig.greetings.channel}`);
      });
    } else if (args[0].toLowerCase() === 'keys') {
      return ctx.sendCode('md', `# Current Keys:\n* set -> Sets the key/value.\n* list -> Sees the current greetings settings.\n* variables -> Shows the variables for the greetings message.`);
    } else if (args[0].toLowerCase() === 'variables') {
      return ctx.sendCode('md', `# Current Variables:\n\n## Member\n* $(user): Shows your username and discrim. (Example: August 🌺#5820)\n* $(user.name): Shows your username. (Example: August 🌺)\n* $(user.id): Shows your ID. (Example: 280158289667555328)\n* $(user.mention): Mentions you. (Example: <@280158289667555328>)\n* $(user.avatar): Shows the current avatar. (If they don't have an avatar, it will be there default avatar.)\n\n## Guild\n* $(guild): Shows you the guild name. (Example: August's Humble Abode)\n* $(guild.id): Shows the guild ID. (Example: 382725233695522816)\n* $(guild.members): Shows the current guild member count. (Example: 60)\n* $(guild.roles): Shows how many roles the server has. (Example: 5)\n* $(guild.emojis): Shows how many emojis the server has. (Example: 8)`);
    }
  }
};