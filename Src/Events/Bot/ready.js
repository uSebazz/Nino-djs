const events = require('../../Data/Structures/Events');
const Client = new (require('../../Data/Structures/ClientInit'))();
const colors = require('colors');

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 */
	run = async (client) => {
		if (client._guilds === true) {
			await client.application.commands.set(client._array);
			console.log('[Client]:'.white, 'Regristrado con éxito los ( / ) - Global');
		} else {
			await client.guilds.cache.get(process.env.GUILD).commands.set(client._array);
			console.log('[Client]:'.white, 'Regristrado con éxito los ( / ) - Servidor de pruebas');
		}
		client._music.connect(client.user.id);
		console.log('[Client]:'.white, `${client.user.tag} listo.`);
	};
};
