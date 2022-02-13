const { readdirSync, readdir } = require('fs');
const Client = new (require('../../Data/Structures/ClientInit'))();
/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
	readdirSync('./Src/Slash').forEach((dir) => {
		readdir(`./Src/Slash/${dir}`, (e) => {
			if (e) throw new Error(e);
			readdirSync(`./Src/Slash/${dir}`)
				.filter((f) => f.endsWith('.js'))
				.forEach((command) => {
					const req = require(`../../Slash/${dir}/${command}`);
					const cmd = new req(client);
					const data = {
						name: cmd._info.name,
						description: cmd._info.description,
						options: cmd._info.options ? cmd._info.options : [],
					};
					client._array.push(data);
					client._slash.set(cmd._info.name, cmd);
				});
		});
	});
};
