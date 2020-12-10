module.exports = {
    name: 'user',
    aliases: ['userinfo'],
    description: 'return basic info about the user',
    cooldown: 2,
    cd: "Stop stalking",
    execute(message, args, d) {
        let user;
        let name;
        let target = message.mentions.members.first();
        if (!target) {
            user = message.author;
            name = message.author.username;
        } else if (target) {
            user = target
            name = target.displayName;
        } else {
            return message.channel.send('Use a valid mention!');
        }
        const usersoloEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setAuthor(user.tag, user.user.displayAvatarURL())
            .addFields( {
                name: 'User ID',
                value: user.id
            }, {
                name: 'Joined Server',
                value: user.joinedAt
            }, {
                name: 'Joined Discord',
                value: user.user.createdAt
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Databases');

        message.channel.send(usersoloEmbed);
    }
};