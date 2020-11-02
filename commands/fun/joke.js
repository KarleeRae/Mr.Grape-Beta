const {client, Discord} = require('discord.js')  
module.exports = {
    name: 'joke',
    description: 'get a joke',
    aliases: ['jk'],
    cooldown: 3,
    async execute(message, args, d) {
     let jokeURL = "https://sv443.net/jokeapi/v2/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist&format=txt"
     let joke = await d.r2.get(jokeURL).text;
     const kek = client.emojis.find(emoji => emoji.name === "kek");
      const jk = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(`Joke ${kek}`)
            .addFields({
                name: joke,
                value: '_'
            })
            .setTimestamp()
            .setFooter('Grape Dice Club');
        message.channel.send(jk);
    }
};
