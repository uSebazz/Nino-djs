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
	run = async (client, track) => {
		console.log('[Lava]:'.red, `Una track no se ha podido reproducir. Track: ${track}`);
	};
};
