module.exports = {
	name: 'pause',
	description: 'pause a song that\'s playing',
	cooldown: 2,
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			const p = new d.Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle('Song Queue')
				.setDescription('Removal')
				.addField(`Paused.`, '_')
				.setTimestamp()
				.setFooter('DJ Grape');
			return message.channel.send(p);
		}
		return message.channel.send("Can't pause if its playing or if there\'s no music bruh");
	}
};
