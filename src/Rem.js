const { Client } = require('./structures');
const config = require('./config.json');

new Client({
  token: config.token,
  clientOptions: {
    getAllUsers: true,
    maxShards: 'auto',
    disableEveryone: true,
    autoreconnect: true
  }
}).launch();