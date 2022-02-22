const { readdirSync } = require('fs');
const Client = new (require('../../Data/Structures/ClientInit'))();
/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
	/**
	 * @INFO Event
	 */
	readdirSync('./Src/Events/Bot')
		.filter((f) => f.endsWith('.js'))
		.forEach((c) => {
			const file = require(`../../Events/Bot/${c}`);
			const event = new file(file, client);
			client.on(c.replace('.js', ''), (...args) => event.run(client, ...args));
		});
	/**
	 * @INFO Music
	 */
	readdirSync('./Src/Events/Music')
		.filter((f) => f.endsWith('.js'))
		.forEach((c) => {
			const file = require(`../../Events/Music/${c}`);
			const event = new file(file, client);
			client._music.on(c.replace('.js', ''), (...args) => event.run(client, ...args));
		});
};
