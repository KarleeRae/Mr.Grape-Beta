module.exports = {
	name: 'nowplaying',
	description: 'get see what song is currently playin',
	cooldown: 2,
  	aliases: ['np'],
	execute(message, args, d) {
    const serverQueue = message.client.queue.get(message.guild.id);
   if (isNaN(parseInt(args[0])) || !args[0]) return message.channel.send('Give me a valid number so I can remove that song!');
   let remove = args[0] + 1;
   let arr = serverQueue.songs;
   if (remove > arr.length || remove < 0) return message.channel.send('Bro that's not a valid song to remove.')
   message.channel.send('Removed ' + `**${arr[remove].title}**`)
   arr.splice(remove, 1);
  }
};
