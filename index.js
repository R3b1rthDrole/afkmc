//load discord
const Discord = require('discord.js')
const client = new Discord.Client()

//load bot
const mineflayer = require("mineflayer");
const bot = mineflayer.createBot({
    host: 'mc.pvp-warcraft.net',
    port: '25565',
    //username: '4FK',
    username: 'eziosala32@gmail.com',
    password: 'eziosala47390',
})

//salons discord
let channeler;
client.on('ready', async() => {
    channeler = await client.channels.cache.get("835254128334077952")
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
})

//Discord -> Minecraft
client.on('message', message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.id !== channeler.id) return;
    if (message.content.startsWith("!")) return;
    bot.chat(message.content)
})

//Minecraft -> Discord
bot.on('message', async(message) => {
    let msg = message.toString()
    if (!msg) return;
    if (channeler) {
        if (msg === "[»] Tu as été déconnecté du serveur, vous avez donc été automatiquement redirigé vers le serveur principal! La raison de la déconnexion est '» Redémarrage du serveur.'!") {
            channeler.send(msg).catch((err) => console.log(err))
            setTimeout(() => {
                login()
            }, 60 * 1000)
        } else {
            channeler.send(msg).catch((err) => console.log(err))
        }
    }
})

//Connection
bot.once('spawn', () => {
    bot.chat(`/login eziosala`)
    setTimeout(function() {
        bot.setQuickBarSlot(4)
        bot.activateItem()
    }, 2500);
})

//Boussole + inventaire
function login() {
    bot.setQuickBarSlot(4)
    bot.activateItem()
}

bot.on('windowOpen', (window) => {
    console.log('window open')
    bot.clickWindow(16, 0, 0)
})

//Catch
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err))

//Connection discord
client.login(process.env.TOKEN)
