const { Command } = require('../../structures');

module.exports = class ProfileCommand extends Command {
  constructor(bot) {
    super(bot, {
      command: 'profile',
      description: 'See your profile, or see another user\'s profile, or set some things.',
      syntax: 'profile [user] | [set] [key] [value] | [list]',
      category: 'Economy',
      guildOnly: true,
      cooldown: 5
    });
  }

  execute(ctx, args) {
    this.bot.r.table('users').get(ctx.author.id).run((error, uConfig) => {
      if (error) return this.bot.utils.handleDatabaseError(error);

      if (!args[0]) {
        return ctx.send({
          title: `${ctx.author.username}#${ctx.author.discriminator}'s Profile:`,
          description: [
            `**${uConfig.profile.description}**\n`,
            `${uConfig.badges.isBotOwner === true ? uConfig.badges.named.bot_owner : uConfig.badges.isDeveloper === true ? uConfig.badges.named.developer : uConfig.badges.isStaff === true ? uConfig.badges.named.staff : uConfig.badges.isDonator === true ? uConfig.badges.named.donator : uConfig.badges.isTrusted === true ? uConfig.badges.named.trusted : uConfig.badges.named.normal}\n`,
            `**Coins**: *${uConfig.coins.toLocaleString()}¥*`,
            `**Waifu**: *${uConfig.profile.waifu || `Get a waifu by doing the command: \`${ctx.prefix}profile set waifu <waifu>\``}*`,
            `**osu!**: *${uConfig.profile.osu || `Add your osu! profile by doing the command: \`${ctx.prefix}profile set osu <osu_username>\``}*`,
            `**MyAnimeList**: *${uConfig.profile.mal || `Add your MyAnimeList profile by doing the command: \`${ctx.prefix}profile set mal <mal_username>\``}*`,
            `**Married To**: ${uConfig.marriages.isMarried === false ? "Not married!" : `<@${uConfig.marriages.to}>`}`
          ].join("\n"),
          color: this.bot.color
        });
      } else if (args[0].toLowerCase() === 'set') {
        if (!args[1]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a key! Use the \`list\` argument to see what are the avaliable keys.`);
        if (!args[2]) return ctx.send(`${this.bot.constants.emojis.ERROR} | You must provide a value!`);

        if (args[1].toLowerCase() === 'description') {
          this.bot.r.table('users').get(ctx.author.id).update({
            profile: {
              description: args.slice(2).join(" ")
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Profile description has been set to \`${args.slice(2).join(" ")}\`. Check your profile!`);
          });
        } else if (args[1].toLowerCase() === 'waifu') {
          this.bot.r.table('users').get(ctx.author.id).update({
            profile: {
              waifu: args.slice(2).join(" ")
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | Your waifu is now \`${args.slice(2).join(" ")}\`.`);
          });
        } else if (args[1].toLowerCase() === 'osu') {
          this.bot.r.table('users').get(ctx.author.id).update({
            profile: {
              osu: args.slice(2).join(" ")
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | osu!profile has been set to \`${args.slice(2).join(" ")}\`.`);
          });
        } else if (args[1].toLowerCase() === 'mal') {
          this.bot.r.table('users').get(ctx.author.id).update({
            profile: {
              mal: args.slice(2).join(" ")
            }
          }).run((error) => {
            if (error) return this.bot.utils.handleDatabaseError(error);
            return ctx.send(`${this.bot.constants.emojis.SUCCESS} | MyAnimeList profile has been set to \`${args.slice(2).join(" ")}\`.`);
          });
        }
      } else if (args[0].toLowerCase() === 'list') {
        ctx.channel.createMessage({
          content: `${this.bot.constants.emojis.MEMO} | Current Keys:`,
          embed: {
            description: `\`\`\`ini\n[description]: Set the description of your profile!\n[osu!]: Set your osu!profile.\n[mal]: Set your MyAnimeList account.\n[waifu]: Set your current waifu.\`\`\``,
            color: this.bot.color
          }
        });
      } else {
          this.bot.utils.resolveUser(args.join(" ")).then((user) => {
            this.bot.r.table('users').get(user.id).run((error, uConfig) => {
              if (error) return this.bot.utils.handleDatabaseError(error);
      
              return ctx.send({
                title: `${user.username}#${user.discriminator}'s Profile:`,
                description: [
                  `**${uConfig.profile.description}**\n`,
                  `${uConfig.badges.isBotOwner === true ? uConfig.badges.named.bot_owner : uConfig.badges.isDeveloper === true ? uConfig.badges.named.developer : uConfig.badges.isStaff === true ? uConfig.badges.named.staff : uConfig.badges.isDonator === true ? uConfig.badges.named.donator : uConfig.badges.isTrusted === true ? uConfig.badges.named.trusted : uConfig.badges.named.normal}\n`,
                  `**Coins**: *${uConfig.coins.toLocaleString()}¥*`,
                  `**Waifu**: *${uConfig.profile.waifu || `Get a waifu by doing the command: \`${ctx.prefix}profile set waifu <waifu>\``}*`,
                  `**osu!**: *${uConfig.profile.osu || `Add your osu! profile by doing the command: \`${ctx.prefix}profile set osu <osu_username>\``}*`,
                  `**MyAnimeList**: *${uConfig.profile.mal || `Add your MyAnimeList profile by doing the command: \`${ctx.prefix}profile set mal <mal_username>\``}*`,
                  `**Married To**: ${uConfig.marriages.isMarried === false ? "Not married!" : `<@${uConfig.marriages.to}>`}`
                ].join("\n"),
                color: this.bot.color
              });
            });
          }).catch(() => ctx.send(`${this.bot.constants.emojis.ERROR} | No users found.`));
      }
    });
  }
};