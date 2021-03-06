const { Command } = require("../../structures");
const checkmark = "✅"

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "help",
                type: "utility",
                description: "Get help on commands.",
                usage: "If you're reading this, you've figured it out already.",
                aliases: ["assistance"],
                saying: "Don't spam help command.",
                cooldown: 2
            });
        }

        toProper(string) {
            return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
        }

        getCommands(type) {
            const arr = [];
            for (const command of this.client.commands.values()) {
                if (command.type === type) arr.push(command.name);
            }
            return arr;
        }

        async main(msg, args) {

            await msg.react(checkmark)

            const aliases = {
                "mod": "moderation",
                "mus": "music",
                "utils": "utility",
                "util": "utility",
                "eco": "economy"
            }
            const helpArg = args[0]?.toLowerCase()
            const categories = ["economy", "fun", "moderation", "music", "utility"];

            if (!helpArg) {
                const helpEmbed = new msg.embed()
                    .setTitle("Help")
                    .addFields(
                        { name: "Categories", value: categories.map(e => this.toProper(e)).join("\n") },
                        { name: "Additional Info", value: "For help on a command or category, [command|category]." }
                    )
                return msg.send(helpEmbed)
            }
            else if (Object.keys(aliases).includes(helpArg) || categories.includes(helpArg)) {
                const category = aliases[helpArg] || helpArg;
                const commands = this.getCommands(category).map(c => `\`${c}\``).join(", ");
                const helpEmbed = new msg.embed()
                    .setTitle("Help")
                    .addField(`Commands in the ${this.toProper(category)} Category!`, commands)
                return msg.send(helpEmbed)
            }
            else if (this.client.commands.has(helpArg)) {
                const command = this.client.commands.get(helpArg);
                const commandEmbed = new msg.embed()
                    .setTitle(this.toProper(command.name))
                    .setDescription(command.description)
                    .addFields(
                        { name: "Type", value: this.toProper(command.type) },
                        { name: "Usage", value: command.usage },
                        { name: "Aliases", value: command.aliases.join(", ") }
                    )
                return msg.send(commandEmbed)
            }
            else msg.send("That's not a valid command or category!");
        }
    };