const { MusicCommand } = require("../../structures");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "disconnect",
                type: "music",
                description: "Tell the bot to disconnect from the voice channel.",
                usage: "No arguments required.",
                aliases: ["dc", "leave", "stop", "begone", "noonelikesyou"],
                saying: "Stop disconnecting me, its annoying.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            musicPlayer.disconnect();
            this.musicQueues.delete(msg.guild.id);
            msg.send("Cya!")
        }
    };