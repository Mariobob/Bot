const Eris = require('eris').Client;
const CommandStore = require('../stores/CommandStore');
const EventStore = require('../stores/EventStore');
const MessageCollector = require('../collector/MessageCollector');
const CommandHandler = require('../handlers/CommandHandler');
const Collection = require('../../util/Collection');
const Util = require('../../util/Util');
const xnx = require('sj.reggol');
const PermissionUtil = require('../../util/PermissionUtil');

module.exports = class RemClient extends Eris {
  constructor(options) {
    super(options.token, options.clientOptions);

    this.cmds = new Collection();
    this.queue = new Collection();
    this.reminders = new Collection();
    this.commandStore = new CommandStore(this);
    this.eventStore = new EventStore(this);
    this.utils = new Util(this);
    this.commandHandler = new CommandHandler(this);
    this.log = new xnx.Logger(true);
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
  }

  async launch() {
    this.commandStore.run();
    this.eventStore.run();
    this.connect()
      .then(() => this.log.info('Rem is connecting via WebSocket (WS)'));
  }

  isOwner(id) {
    return ['280158289667555328', '387043512232968193', '107130754189766656', '229552088525438977'].includes(id);
  }

  gatherInvite(permission) {
    permission = PermissionUtil.resolve(permission);
    return `https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=${permission}`;
  }
};