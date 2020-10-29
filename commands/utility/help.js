const fileh = require('filehound')
module.exports = {
    name: 'help',
    description: 'help command bro',
    execute(message, args, d) {
        let alias;
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };
        const {
            commands
        } = message.client;
        const subdirectories = fileh.create()
                .path("./commands")
                .directory()
                .findSync();
        const sub = subdirectories.toString().replace(/,/g, '\n').replace(/commands\//g, '');
        if (!args.length) {
            const helpEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields({
                    name: 'Command Categories',
                    value: toTitleCase(sub)
                }, {
                    name: 'Help',
                    value: `For help on a specific command or category, do ${d.config.prefix}help [category/command]`
                }, )
                .setTimestamp()
                .setFooter('Grape Databases');
            message.channel.send(helpEmbed);
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (sub.includes(name)) {
            const files = fileh.create()
                .paths(`./commands/${name}`)
                .ext('js')
                .findSync();
            let string = `commands/${name}`
            const map = {string:"",".js":""}
            let re = new RegExp(Object.keys(map).join("|"),"gi");
            files.replace(re, function(matched){return map[matched]});)
            const helpCommandEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(toTitleCase(name))
                .addFields({
                    name: 'Commands',
                    value: files
                }, {
                    name: 'Help',
                    value: `For more help on a specific command, do ${d.config.prefix} help [command]`
                },)
                .setTimestamp()
                .setFooter('Grape Databases');
            message.channel.send(helpCommandEmbed);
        } else if (command) {
            if (!command.aliases) {
                alias = 'None.'
            } else {
                alias = command.aliases.join(', ')
            }
            const helpCommandEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
                .addFields({
                    name: 'Description',
                    value: command.description
                }, {
                    name: 'Aliases',
                    value: alias
                }, )
                .setTimestamp()
                .setFooter('Grape Databases');
            message.channel.send(helpCommandEmbed);
        }
        else {message.channel.send('That category or command aint here')}
    }
};
