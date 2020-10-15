const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
async function addMoni(who, howmuch) {
    		let rightnow = await users.get(who);
		if (rightnow === undefined) {await users.set(who, 0)}
    		let moremoni = rightnow + howmuch;
    		await users.set(who, moremoni)
		}
module.exports = {
	name: 'daily',
	description: 'get ur daily amount of stars',
	cooldown: 86400,
	execute(message, args) {
	 let random = Math.floor(Math.random() * 25) + 25;
        const dailystarEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s daily reward`)
            .addFields({
                name: 'Daily Reward',
                value: 'here is ' + ` ${random} ` + ' :star:s'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(dailystarEmbed);
        addMoni(message.author.id, random);
	}
};
