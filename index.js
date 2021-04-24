const express = require('express')
const app = express()
const port = 3000

//load discord
const Discord = require('discord.js')
const client = new Discord.Client()

//load bot
const mineflayer = require("mineflayer");
const bot = mineflayer.createBot({
    host: 'mc.pvp-warcraft.net',
    //username: '4FK',
    username: 'R3b1rth',
})

//salons discord
let channeler;
client.on('ready', async() => {
    channeler = await client.channels.cache.get("835254128334077952")
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    if(channeler) console.log("channel trouvé")
})

//Discord -> Minecraft
client.on('message', message => {
    if (message.author.id === client.user.id) return;
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
    console.log('Je rejoins..')
    bot.chat(`/login eziosala`)
    console.log('connection..')
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
    console.log('inventaire ouvert')
    bot.clickWindow(16, 0, 0)
    console.log("connecté, début de l'afk")
})

//Catch
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err))

//Connection discord
client.login(process.env.TOKEN)
