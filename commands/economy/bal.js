module.exports = {
    name: 'bal',
    aliases: ['balance', 'wallet'],
    description: 'check ur balance',
    execute(message, args, d) {
        async function bal() {
            let target = message.mentions.members.first();
            let person;
            let personName;
            if (args[0] === undefined) {
                person = message.author;
                personName = message.author.username;
            } else if (args[0].startsWith("<@") && args[0].endsWith(">")) {
                person = target;
                personName = target.displayName;
		if (target.user.bot) {message.channel.send('No bots in da economy! (except me cus im cool)'); return;}
            } else {
                message.channel.send('Use a valid mention!');
		return;
            }
            let bal = await d.users.get(person.id)
	    let displayBal;
            if (bal === null || bal === undefined) {
                d.users.set(person.id, 0);
		displayBal = 0
	    } else {
		displayBal = bal    
	    }
                const balEmbed = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(personName + `'s balance`)
                    .addFields({
                        name: 'Balance',
                        value: displayBal + " :star:s"
                    }, )
                    .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                    .setTimestamp()
                    .setFooter('Grape Bank Inc.');
                message.channel.send(balEmbed);

        }
        bal();

    }
};
