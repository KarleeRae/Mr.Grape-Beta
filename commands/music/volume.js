const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "volume",
                type: "music",
                description: "Set the music's volume.",
                usage: "<volume (between 0-100)>",
                aliases: ["vol"],
                saying: "Stop cranking it all over the place.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const number = +args[0];
            let title, info;

            if (!args[0]) [title, info] = ["**Volume**", musicPlayer.volume];

            else if (isNaN(number) || number < 0 || number > 100) return msg.send(`Setting volume to ${args[0]}, not.`);

            else {
                [title, info] = ["**Set Volume**", number];
                musicPlayer.volume = number;
            }
            const volEmbed = new msg.embed()
                .setTitle(`${title}: **${info}**`)
            return msg.send(volEmbed);
        }
    };