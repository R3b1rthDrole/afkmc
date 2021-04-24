//load discord
const Discord = require('discord.js')
const client = new Discord.Client()

//salons discord
let channeler;
client.on('ready', async() => {
    channeler = await client.channels.cache.get("835254128334077952")
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    if(channeler) console.log("channel trouvé")
  let time = 0;
    setInterval(function(){
      time++;
      channeler.send(time)
    },60 * 1000)
})

//Connection discord
client.login(process.env.TOKEN)
