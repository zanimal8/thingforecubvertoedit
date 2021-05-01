const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generateIp() {
  return `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`
}

function getIp (uuid) {
  const realips = require('realips.json')
  let ip
  if (!Object.keys(realips).includes(uuid)) {
    ip = generateIp()
    realips[uuid] = { ip }
    fs.writeFile('realips.json', JSON.stringify(realips), 'utf8')
  }
  return ip ?? realips[uuid]
}

client.on('message', message => {
  var messageLower = message.content.toLowerCase()
  if (messageLower.includes('heck')) {
    message.reply('no swearing');
  }
});


client.on('message', msg => {
  if (msg.content === '!ip') {
    msg.reply('Your IPv4 address is ' + getIp(msg.author.id));
  }
  else if (msg.content.startsWith('!ip') && msg.mentions.users.size > 0) {
    msg.channel.send(`'<@${msg.mentions.users.first()}>\'s address is ${getIp(msg.mentions.users.first().id)}`);
  }
});

client.login(token);