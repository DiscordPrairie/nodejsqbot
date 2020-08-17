const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ0NzQxNzA0MTk1NzY4NDAz.Xznowg.yQIRGUJSjRV517YeMrgyp_8lclA';
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/attachments/737596942720303146/744748892889022474/1_7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('파이리', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('여기서버 관리자들', '현재 관리자 목록')
      .addField('총관리자', '!최진우#5393', true)
      .addField('부총관리자', '카레#7294', true)
      .addField('관리팀장', '솔로문대학병원 병원장 맹구#8871', true)
      .addField('여러가지 게임팀장,개발자 등등', '|뭉이#8206|\파이리#1482|\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('파이리가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == 'help') {
    let helpImg = 'https://cdn.discordapp.com/attachments/737596942720303146/744748892889022474/1_7.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: '서버관리자 목록확인'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 종합 봇 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`종합 봇 BOT 🔗`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('DM공지 완료');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);