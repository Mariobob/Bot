const { Client } = require('./structures');
const config = require('./config.json');
require('./extenders/RemMember');
require('./extenders/RemGuild');
require('./extenders/RemChannel');

new Client({
  token: config.token,
  clientOptions: {
    getAllUsers: true,
    maxShards: 'auto',
    disableEveryone: true,
    autoreconnect: true
  }
}).launch();