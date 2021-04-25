//load discord
const Discord = require('discord.js')
const client = new Discord.Client()

//load bot
const mineflayer = require("mineflayer");

var options = {
    host: 'mc.pvp-warcraft.net',
    username: '4FK',
    //username: 'R3b1rth',
}

const bot = mineflayer.createBot(options)

//salons discord
let channeler;
client.on('ready', async() => {
    channeler = await client.channels.cache.get("835254128334077952")
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    if (channeler) console.log("channel trouvé")
})

//Discord -> Minecraft
client.on('message', message => {
    if (message.author.id !== "273926313352626178") return;
    if (message.channel.id !== channeler.id) return;
    if (message.content.startsWith("!")) return;
    if (!message.content) return;
    bot.chat(message.content)
})

//Minecraft -> Discord
bot.on('message', async(message) => {
    let msg = message.toString()
    if (!msg) return;
    console.log(msg)
    if (channeler) {
        if (msg.includes("LARGAGE")) return;
        if (msg.includes("ENTITEES")) return;
        if (!okay) return;
        channeler.send(msg).catch((err) => console.log(err))
    }
})

let okay = false;
//Connection
bot.on('spawn', () => {
    console.log('redémarrage, reconnection.. dans 5m..');
    setTimeout(function() {
        login();
    }, 5 * 60 * 1000);
})

bot.once('spawn', () => {
    console.log('Je rejoins..')
    bot.chat(`/login eziosala`)
    console.log('connection..')
    setTimeout(function() {
        login();
        okay = true;
    }, 2500)
})

/*bot.on('respawn', () => {
    console.log('redémarrage, reconnection..')
    setTimeout(function() {
        login()
    }, 5 * 60 * 1000)
})*/

//Boussole + inventaire
function login() {
    bot.chat("/skycheat")
    console.log("connecté, début de l'afk")
}

bot.on('windowOpen', (window) => {
    console.log('inventaire ouvert')
    bot.clickWindow(16, 0, 0)
    console.log("connecté, début de l'afk")
})

//Catch
bot.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn)
    bot = mineflayer.createBot(options);
});
bot.on('error', err => console.log(err))

client.login(process.env.TOKEN)
