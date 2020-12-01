const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const youtube = require('youtube-sr');
const ytpl = require('ytpl');
module.exports = {
	name: 'play',
	description: 'play music, either do play <search> or play <youtube_url>',
	aliases: ['p'],
	cooldown: 2,
	async execute(message, args, d) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Get in a voice channel if you wanna play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Bruh I don\'t have perms to connect');
		if (!permissions.has('SPEAK')) return message.channel.send('Bruh I don\'t have perms to speak');

		const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const plRegex = /[&?]list=([^&]+)/i;
		const serverQueue = message.client.queue.get(message.guild.id);
		const argument = args.join(' ');

		function createSong(title, url, duration, thumbnail) {
			const song = {
				"title": title,
				"url": url,
				"duration": duration,
				"thumbnail": thumbnail
			}
			return song;
		}

		function announce(song, started, isPlaylist) {
			let e;
			if (isPlaylist) { e = 'Playlist added!' }
			else if (started) { e = 'Groovin to the tunes!' }
			else { e = 'Added to the queue!' }
			const announceEmbed = new d.Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle(song.title)
				.setURL(song.url)
				.setDescription(`Duration: ${song.duration}`)
				.setThumbnail(song.thumbnail)
				.addField(e, '_')
				.setTimestamp()
				.setFooter('DJ Grape');
			return announceEmbed;
		}

		if (ytRegex.test(argument) && plRegex.test(argument)) {
			const playlist = await youtube.getPlaylist(argument);
			for (video in playlist.videos) {
				let plSong = playlist.videos[video];
				let song = createSong(Util.escapeMarkdown(plSong.title), `https://www.youtube.com/watch?v=${plSong.id}`, plSong.durationFormatted, plSong.thumbnail.url)
				playSong(song, message, channel, serverQueue, true)
			}
			const playlistInfo = {
				title: playlist.title.charAt(0).toUpperCase() + playlist.title.slice(1),
				url: playlist.url,
				thumbnail: playlist.thumbnail,
				duration: 'It\'s a playlist bro'
			}
			message.channel.send(announce(playlistInfo, false, true));
		}
		else {
			let songInfo = await youtube.searchOne(argument);
			let song = createSong(Util.escapeMarkdown(songInfo.title), songInfo.url, songInfo.durationFormatted, songInfo.thumbnail.url)
			playSong(song, message, channel, serverQueue, false)
		}

		async function playSong(song, message, vc, queue, ifPlaylist) {
			if (queue) {
				if (queue.dispatcher === null) {
					message.client.queue.delete(message.guild.id);
					await vc.join();
				}
				queue.songs.push(song);
				if (!ifPlaylist) { message.channel.send(announce(song, false, false)); }
				return;
			}
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: channel,
				connection: null,
				songs: [],
				volume: 2,
				playing: true,
				repeatMode: 0,
			};

			message.client.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);

			const play = async song => {
				const queue = message.client.queue.get(message.guild.id);
				if (!song) { return; }

				let stream = ytdl(song.url, {
					filter: "audioonly",
					quality: "highestaudio"
				});

				const dispatcher = queue.connection.play(stream)
					.on('finish', () => {
						if (queue.repeatMode === 0) { queue.songs.shift(); }
						else if (queue.repeatMode === 2) { queue.songs.push(queue.songs.shift()); }
						else { null; }
						play(queue.songs[0]);
					})
					.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(queue.volume / 5);
				queue.textChannel.send(announce(song, true, false));
			};

			try {
				const connection = await channel.join();
				queueConstruct.connection = connection;
				play(queueConstruct.songs[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				message.client.queue.delete(message.guild.id);
				await channel.leave();
				return message.channel.send(`I could not join the voice channel: ${error}`);
			}
		}
	}
};
