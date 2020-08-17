const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ0NzQxNzA0MTk1NzY4NDAz.Xznowg.yQIRGUJSjRV517YeMrgyp_8lclA';
const welcomeChannelName = "🎉ㅣ안녕하세요";
const byeChannelName = "🎉ㅣ안녕히가세요";
const welcomeChannelComment = "저희 서버에 오신걸 환영합니다";
const byeChannelComment = "서버에서 나가셨습니다";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);