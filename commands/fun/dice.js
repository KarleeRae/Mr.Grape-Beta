const { Command } = require("../../structures");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "dice",
                type: "fun",
                aliases: ["roll"],
                description: "Roll a die!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "Chill on the dice.",
            })
        }

        main(msg, args) {
            const diceRoll = new msg.embed()
                .setTitle(`${msg.author.username}'s die`)
                .addField('You rolled', Math.floor(Math.random() * 6) + 1)
            msg.send(diceRoll)
        }
    }