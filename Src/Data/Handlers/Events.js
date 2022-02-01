const { readdirSync } = require('fs');
const Client = new (require('../../Data/Structures/ClientInit'))();
const colors = require('colors');
/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
	/**
	 * @INFO Event
	 */
	console.log('Event Status━━━━━━━━━━━━━━━━━━━━━┓'.yellow);
	readdirSync('./Src/Events/Bot')
		.filter((f) => f.endsWith('.js'))
		.forEach((c) => {
			const file = require(`../../Events/Bot/${c}`);
			const event = new file(file, client);
			let eventName = c.replace('.js', '') || c.replace('.js', '') || 'No hay nombre del evento';
			let option = eventName == 'No hay nombre del evento' ? '❌' : '✅';
			client.on(c.replace('.js', ''), (...args) => event.run(client, ...args));
			console.log('|'.yellow, `Cargado: ${option}`, '|'.yellow, `${eventName}`);
		});
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'.yellow);
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
