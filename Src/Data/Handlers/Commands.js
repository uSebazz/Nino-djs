const { readdirSync, readdir } = require('fs');
const Client = new (require('../../Data/Structures/ClientInit'))();
/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
	readdirSync('./Src/Commands').forEach((dir) => {
		readdir(`./Src/Commands/${dir}`, (e) => {
			if (e) throw new Error(e);
			readdirSync(`./Src/Commands/${dir}`)
				.filter((f) => f.endsWith('.js'))
				.forEach((command) => {
					const req = require(`../../Commands/${dir}/${command}`);
					const cmd = new req(client);
					client._commands.set(cmd._info.name, cmd);
					if (cmd._info.aliases)
						cmd._info.aliases.forEach((a) => client._aliases.set(a, cmd._info.name));
				});
		});
	});
};
