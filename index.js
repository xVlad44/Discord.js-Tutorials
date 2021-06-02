const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
client.commands = new Discord.Collection()

const config = require('./config.json');
const prefix = config.prefix

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name,command);
}
const activities_list = [
    'help',
    'smth',
    'xd',
    'ok'
]//etc
client.on('ready', () =>{
    console.log(`${client.user.tag} is online !`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index],{
        type: "WATCHING"
    }) 
    }, 1*1000) // loop time
   
})
client.on('message',(message) =>{
    if(message.channel.type =='dm') return;
    if(!message.content.startsWith(prefix)|| message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message,args);
    }
})
client.login(config.token);