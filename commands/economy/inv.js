module.exports = {
    name: 'inv',
    description: 'dig to earn stars',
    aliases: ['inventory'],
    cooldown: 3,
    execute(message, args, d) {
	let target = message.mentions.members.first();
        async function inv() {
	    let person;
	    let personName;
            if (args[0] === undefined) {
                person = message.author;
                personName = message.author.username;
            } else if (args[0].startsWith("<@") && args[0].endsWith(">")) {
                person = target;
                personName = target.displayName;
                if (target.user.bot) {
                    message.channel.send('No bots in da economy! (except me cus im cool)');
                    return;
                }
            } else {
                message.channel.send('Use a valid mention!');
                return;
            }
            let inv = await d.items.get(person.id);
            const invEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(personName + "'s inventory")
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Storages Org.');
            if (Object.keys(inv).length === 0) {invEmbed.addFields({name: 'nothing but cobwebs and dust m8', value: '_'});}
	    else {
            for (const key in inv) {
		if (inv[key] === 0) {
			delete inv[key]; 
			await d.items.set(message.author.id, inv); 
			continue;
		}
                invEmbed.addFields({
                    name: key.charAt(0).toUpperCase() + key.slice(1) + "(s)",
                    value: `${inv[key]}`
                });
            }
	}
            message.channel.send(invEmbed);
        }
        inv();
    }
};
