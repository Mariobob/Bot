const { Client } = require('./structures');
const config = require('./config.json');

const client = new Client({
  token: config.token,
  clientOptions: {
    getAllUsers: true,
    maxShards: 'auto',
    disableEveryone: true,
    autoreconnect: true
  }
});

process.on('unhandledRejection', (e) => {
  client.log.error(e.stack);
});
process.on('exit', () => {
  client.destory();
});