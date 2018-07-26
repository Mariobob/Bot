const config = require('../config.json');
const creds = new RegExp([
  config.token,
  config.api_keys.weeb,
  config.api_keys.oliyBots
].join('|'), 'gi');

/**
 * Gets the User Agent
 * 
 * @returns {String} The user agent.
 */
exports.ua = `RemBot/v${require('../../package.json').version}/Production (https://github.com/ohlookitsAugust/RemBot)`;

/**
 * Gets an emoji.
 * 
 * @returns {Object} The object of the emojis.
 */
exports.emojis = {
  SUCCESS: '<:success:464708611260678145>',
  ERROR: '<:xmark:464708589123141634>',
  MEMO: ':pencil:',
  NO: ':name_badge:'
};

/**
 * Redacts the sensitive stuff (The tokens)
 * 
 * @param {String} str The string of code (Mostly for `eval` and `exec` commands.)
 * @returns {String} The string that replaces the tokens.
 */
exports.redact = (str) => str.replace(creds, 'Nope!');

/**
 * This is useful for the `help` command.
 * 
 * @returns {Object} The object of Emotes.
 */
exports.help = {
  Social: '<:remHmph:459410890802855936>',
  Animals: ':dog:',
  Developers: '<:developer:469470655209930773>',
  Events: ':clock:',
  Economy: ':yen:',
  Fun: ':rofl:',
  General: ':information_source:',
  Marriage: ':bride_with_veil:',
  Music: '<a:music:466727792910794754>',
  Settings: ':gear:',
  "Text Edit": ":pencil:",
  Utility: ':tools:',
  "Minigames": ":video_game:"
};