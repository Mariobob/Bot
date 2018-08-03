# RemBot
[![Discord](https://discordapp.com/api/guilds/382725233695522816/embed.png)](https://discord.gg/gzPtR34) [![Donate on Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://patreon.com/ohlookitsAugust) [![Build Status](https://travis-ci.org/ohlookitsAugust/RemBot.svg?branch=master)](https://travis-ci.org/ohlookitsAugust/RemBot)

An customizable, stable Discord Bot for Fun, Music, Memes, Economy, and more!

## Commands (86 Commands):
### Animals (6 Commands):
* **birb**: `Grab an random birb photograph`
* **cat**: `Grabs an random cat photograph`
* **dog**: `Grabs an random dog photograph`
* **duck**: `Grab an random duck photograph`
* **penguin**: `Grabs an random penguin photograph`

### Developers (6 Commands):
* **add-badge**: `Adds an badge to a user.`
* **add-balance**: `Adds x amount to a user's balance.`
* **eval**: `Evaluates arbitrary JavaScript code.`
* **exec**: `Evalutes arbitrary Shell/Bash code.`
* **remove-badge**: `Removes a badge.`
* **remove-balance**: `Removes x amount to a user's balance.`

### Economy (10 Commands):
* **badge**: `Shows your current badge.`
* **balance**: `Shows your current balance.`
* **bet**: `Bet x amount of money to win or loose.`
* **daily**: `Collect your daily money.`
* **inventory**: `Shows your current inventory.`
* **mine**: `Mine some money.`
* **profile**: `Shows your current profile.`
* **shop**: `The current guild's shop.`
* **slots**: `Play a game of slots and win or lose.`
* **transfer**: `Transfers money to another user.`

### Events (3 Commands):
* **days-until**: `Shows x amount of days until y.`
* **google-doodle**: `Searches the google doodle of the month and date.`
* **neko-atsume-password**: `Shows the current Neko Atsume password.`

### Fun (13 Commands):
* **aavatar**: `Gives an random anime avatar.`
* **anime**: `Searches an anime of your choice from Kitsu.io`
* **chuck-norris**: `Grabs an random Chuck Norris joke.`
* **dadjoke**: `Grabs an random Dad Joke.`
* **fbi**: `Meanwhile at x's house...`
* **floof**: `Grabs an random floof. (For the furries)`
* **google-feud**: `Play a game of Google Feud and see if you're the master of Google.`
* **lolicons**: `Lolicons such as yourself only belong in jail.`
* **magic-conch**: `Ask the Magic Conch a question.`
* **magic8**: `Ask the magic 8 a question and find the answer.`
* **manga**: `Searches an manga of your choice from Kitsu.io`
* **yomamma**: `Grabs an Yo Mamma joke.`

### General (8 Commands):
* **about**: `Shows information about Rem.`
* **changelog**: `Views Rem's current 5 commits.`
* **help**: `Gives help on a command/alias; Gives full documentation of Rem's commands.`
* **inviteme**: `Invite me to your discord server~`
* **ping**: `Shows my "shard" and "message" ping.`
* **shards**: `Shows information about the shards.`
* **statistics**: `Gets realtime statistics about Rem.`
* **uptime**: `Shows the duration how long Rem is online.`

### Marriage (2 Commands):
* **divorce**: `Divorce your loved one.`
* **marry**: `Marry someone if you're lonely.`

### Search (7 Commands):
* **eshop**: `Searches the Nintendo eShop for a game.`
* **github**: `Searches information about a GitHub repository or user.`
* **mdn**: `Searches the Mozilla Developer Network for JavaScript prototypes.`
* **npm**: `Searches the Node Package Manager (NPM) registry for a NPM package.`
* **rule-of-the-internet**: `Shows you a rule of the internet.`
* **vocadb**: `Searches the VocaDB for a vocaloid song.`

### Settings (4 Commands):
* **farewell**: `The 'farewell' system.`
* **greetings**: `The 'greetings' system.`
* **logging**: `The 'logging' system.`
* **prefix**: `Changes the current prefix.`

### Social (7 Commands):
* **cuddle**: `Cuddle with a user.`
* **feed**: `Feed another use food!`
* **hug**: `Hug another user.`
* **kiss**: `Kiss a user.`
* **lick**: `Lick another user.`
* **pat**: `Pat another user for there hard work.`
* **poke**: `Poke another user because you wanna be annoying.`

### Tags (5 Commands):
* **tag-create**: `Create a tag.`
* **tag-delete**: `Deletes a tag.`
* **tag-edit**: `Edits a tag.`
* **tag-list**: `Shows the current tags in a guild.`
* **tags**: `Views the tag's content.`

### Text Edit (6 Commands):
* **base64**: `Encode/Decode stuff.`
* **braille**: `Convert text to Braille.`
* **clapify**: `👏 Clapify 👏 your 👏 text 👏 like 👏 this. 👏`
* **eyeify**: `👀 Eyeify 👀 your 👀 text 👀 like 👀 this. 👀`
* **owoify**: `owoify youw message wike this >w<`
* **translate**: `Translate the text to 1 language to another.`

### Utility (11 Commands):
* **amiadmin**: `Are you admin?`
* **avatar**: `Shows yours or another user's avatar.`
* **channelinfo**: `Gives information about a text, voice, or category channel.`
* **eslint**: `ESLint your code.`
* **hti**: `Converts hexadecimals to integers.`
* **ith**: `Convert integers to hexadecimals.`
* **roleinfo**: `Gives information about a role.`
* **serverinfo**: `Gives information about the current guild or another guild that Rem is in.`
* **snipe**: `Snipes a user's deleted message.`
* **timezone**: `Shows the current time in a timezone.`
* **userinfo**: `Gives information about a user.`

## Self-hosting
You're allowed to self host Rem but you must credit us.

### Self-hosting: Components
You will need the following to make Rem work:
* [Node.js](https://nodejs.org/en): The runtime framework with JavaScript.
* [RethinkDB](https://www.rethinkdb.com/): Database
* git: Cloning the repository.

### Self-hosting: Installing
You must do the following for Linux/Windows:

#### Self-hosting: Installing on Windows/Linux
```sh
$ git clone https://github.com/ohlookitsAugust/RemBot.git && cd RemBot
$ npm install
$ cd src
$ node Rem.js # or pm2 start Rem.js --name="Rem" if using PM2.
```

### Self-hosting: Database
You must add the following keys (as tables):
* guilds
* users
* snipes
* intervals
* website

and you should be all set!

## Credits
* [PassTheMayo](https://mayo.pw) **~** VoiceConnection class, Music Commands, some fun commands, and more~
* [Mantaro](https://mantaro.site) **~** Initial website design. 
* [dragonfire535](https://github.com/dragonfire535) **~** memes and the RequestHandler for Rem. <3
* [Aetheryx](https://github.com/Aetheryx) **~** MessageCollector. <3 (~~*love ya aeth*~~)
* [York](https://github.com/NotAWeebDev) **~** `slots` and `trivia` commands.

## Developers
|Avatar|Name|Role|
|------|----|----|
|![](https://cdn.discordapp.com/avatars/280158289667555328/a_ad4ddaca0f0d6d6835de2517b14e1c3a.gif?size=128)|[**`August#5820`**](https://augu.me)|Lead Developer|
|![](https://cdn.discordapp.com/avatars/387043512232968193/bc66d95eacd141aeebc489e32013ed6a.png?size=128)|[**`snarkyllama#4331`**](https://github.com/snarkyllama)|Developer|
|![](https://cdn.discordapp.com/avatars/229552088525438977/1f147891c1f8f0de065101b41be5c003.png?size=128)|[**`void#0001`**](https://voided.pw)|Developer|
|![](https://cdn.discordapp.com/avatars/145557815287611393/a_35ed04364d52919779a57facd0bd5927.gif?size=128)|[**`Derpy#1337`**](https://derpyenterprises.org)|Developer|

[![Discord Bots](https://discordbots.org/api/widget/447229568282132510.png)](https://discordbots.org/bot/447229568282132510)