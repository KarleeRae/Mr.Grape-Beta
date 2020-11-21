module.exports = {
    name: 'collect',
    aliases: ['col'],
    description: 'collect the stars from your starmill!',
    cooldown: 0,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let collectedStars;
        const rn = Date.now();
        if (!inv || !inv.starmill || inv.starmill === 0) { return message.channel.send('You don\'t have a starmill! ~~broke man~~'); }
        if (!inv.time.starmill) {
            inv.time.starmill = rn;
            collectedStars = inv.starmill;
        }
        else {
            let elapsedTime = Math.floor((rn - inv.time.starmill) / 60000);
            inv.time.starmill = rn;
            collectedStars = inv.starmill * (elapsedTime / 1);
        }
        d.addMoni(message.author.id, collectedStars);
        await d.items.set(message.author.id, inv)
        const colEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s collection of stars`)
            .addFields({
                name: 'Collected',
                value: collectedStars + " :star:s"
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(colEmbed);

    }
};
