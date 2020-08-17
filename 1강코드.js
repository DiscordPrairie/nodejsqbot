const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ0NzQxNzA0MTk1NzY4NDAz.Xznowg.yQIRGUJSjRV517YeMrgyp_8lclA';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);