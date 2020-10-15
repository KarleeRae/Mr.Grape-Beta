
const Discord = require('discord.js');
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, {
    namespace: 'users'
});
const add = require('./functions/addMoni.js');
module.exports = {
	name: 'gamble',
	description: 'gamble your stars 50/50 chance of losing or gaining your stars',
	cooldown: 5,
	execute(message, args) {
	async function actualGamble(param) {
            let roll = Math.floor(Math.random() * 5) + 1;
            const gambleEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s gambling table`)
                .addFields({
                    name: '--------------',
                    value: 'ok, if you roll an even number you win, if you roll an odd number, you lose'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Gambling Club.');

            message.channel.send(gambleEmbed).then(msg => {
                    msg.delete({
                        timeout: 1800
                    })
                })
                .catch(console.error);

            setTimeout(function() {

                message.edit(gambleEmbed.addFields({
                    name: '--------------',
                    value: 'you rolled a...'
                }, ))

                message.channel.send(gambleEmbed).then(msg => {
                        msg.delete({
                            timeout: 2700
                        })
                    })
                    .catch(console.error);
                setTimeout(function() {
                    message.edit(gambleEmbed.addFields({
                        name: '--------------',
                        value: roll
                    }, ))

                    message.channel.send(gambleEmbed).then(msg => {
                            msg.delete({
                                timeout: 1000
                            })
                        })
                        .catch(console.error);
                    setTimeout(function() {
                        if (roll % 2 === 0) {

                            message.edit(gambleEmbed.addFields({
                                name: '--------------',
                                value: 'Congrats, you get ' + param + " :star:s"
                            }, ))

                            message.channel.send(gambleEmbed);

                            add.addMoni(message.author.id, param);
                        } else {

                            message.edit(gambleEmbed.addFields({
                                name: '--------------',
                                value: 'You lost...'
                            }, ))
                            message.channel.send(gambleEmbed);
                            add.addMoni(message.author.id, -param);

                        }
                    }, 1100)
                }, 3100)
            }, 2100)
        }
        function gamble() {
            let ask;
            let check = await users.get(message.author.id);
            if (args[0] === 'all') {
                ask = await users.get(message.author.id);
                actualGamble(ask);
            } else if (!parseInt(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > check) {
                message.channel.send("thats not a valid number of stars to gamble");
            } else {
                ask = parseInt(args[0])
                actualGamble(ask);
            }

        }

gamble();
	
	
	}
};
