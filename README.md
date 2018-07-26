# Welcome to the RemBot repository!
[![Discord](https://discordapp.com/api/guilds/382725233695522816/embed.png)](https://discord.gg/gzPtR34) [![Donate on Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://patreon.com/ohlookitsAugust) [![Build Status](https://travis-ci.org/ohlookitsAugust/RemBot.svg?branch=master)](https://travis-ci.org/ohlookitsAugust/RemBot)

An customizable, stable Discord Bot for Fun, Music, Memes, Economy, and more!

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
* [dragonfire535](https://github.com/dragonfire535) **~** memes.
* [Aetheryx](https://github.com/Aetheryx) **~** MessageCollector. <3 (~~*love ya aeth*~~)
* [discord.js Team](https://github.com/discordjs/discord.js) **~** The `Structures` class.
  * What is the `Strutures` class? ;w;
  * It's the ability to extend Eris' structure classes.
* [iDroid27](https://github.com/iDroid27) **~** LocaleStore.

## Developers
|Avatar|Name|Role|
|------|----|----|
|![](https://cdn.discordapp.com/avatars/280158289667555328/a_ad4ddaca0f0d6d6835de2517b14e1c3a.gif?size=128)|[**`August#5820`**](https://augu.me)|Lead Developer|
|![](https://cdn.discordapp.com/avatars/387043512232968193/bc66d95eacd141aeebc489e32013ed6a.png?size=128)|[**`snarkyllama#4331`**](https://github.com/snarkyllama)|Developer|
|![](https://cdn.discordapp.com/avatars/229552088525438977/1f147891c1f8f0de065101b41be5c003.png?size=128)|[**`void#0001`**](https://voided.pw)|Developer|
|![](https://cdn.discordapp.com/avatars/145557815287611393/a_35ed04364d52919779a57facd0bd5927.gif?size=128)|[**`Derpy#1337`**](https://derpyenterprises.org)|Developer|

[![Discord Bots](https://discordbots.org/api/widget/447229568282132510.png)](https://discordbots.org/bot/447229568282132510)