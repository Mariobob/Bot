const Eris = require('eris').Client;
const CommandStore = require('../stores/CommandStore');
const EventStore = require('../stores/EventStore');
const MessageCollector = require('../collector/MessageCollector');
const CommandHandler = require('../handlers/CommandHandler');
const Collection = require('../../util/Collection');
const Util = require('../../util/Util');
const Logger = require('../../util/Logger');
const PermissionUtil = require('../../util/PermissionUtil');
const Webhook = require('./Webhook');
const DBLAPI = require('../../lib/DBLAPI');

module.exports = class RemClient extends Eris {
  constructor(options) {
    super(options.token, options.clientOptions);

    this.cmds = new Collection();
    this.queue = new Collection();
    this.commandStore = new CommandStore(this);
    this.eventStore = new EventStore(this);
    this.utils = new Util(this);
    this.commandHandler = new CommandHandler(this);
    this.log = new Logger();
    this.color = 9752573;
    this.package = require('../../../package.json');
    this.config = require('../../config.json');
    this.constants = require('../../util/Constants');
    this.r = require('rethinkdbdash')({
      host: '127.0.0.1',
      port: 28015,
      db: 'RemBot'
    });
    this.collector = new MessageCollector(this);
    this.firstTime = false; // If it's your first time running the bot.
    this.webhook = new Webhook(this, {
      url: this.config.webhook
    });
    this.dbl = new DBLAPI(this.user.id, this.bot.config.api_keys.oliyBots, this.constants.ua);

    if (this.firstTime === true) return this.runFirstSequence();
  }

  async launch() {
    this.commandStore.run();
    this.eventStore.run();
    this.connect()
      .then(() => this.log.info('Rem is connecting via WebSocket (WS)'));
  }

  isOwner(id) {
    return ['280158289667555328', '387043512232968193', '145557815287611393', '229552088525438977'].includes(id);
  }

  gatherInvite(permission) {
    permission = PermissionUtil.resolve(permission);
    return `https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=${permission}`;
  }

  destory() {
    this.disconnect({
      reconnect: false
    });
  }

  runFirstSequence() {
    this.log.info('Welcome to the RemBot Project discord bot. We will begin the database querys shortly...');
    this.utils.delay(5000);

    this.log.info('Creating the database...');
    this.r.dbCreate('RemBot').run();
    this.log.info('Creating keys...');

    this.r.tableCreate('guilds').run();
    this.r.tableCreate('users').run();
    this.r.tableCreate('intervals').run();
    this.r.tableCreate('snipes').run();

    this.log.info('Database has been created successfully. Now running the bot...');
    this.firstTime = false; // Set it back to false so it won't loop everytime it runs.
    this.launch();
  }
};