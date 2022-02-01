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
	run = async (client, oldMessage, newMessage) => {
		if (!oldMessage) return;
		if (newMessage.partial) return;
		if (oldMessage.content == newMessage.content) return;
		if (newMessage.createdAt.getTime() < new Date(Date.now() - 120000)) return;

		client.emit('messageCreate', newMessage, true);
	};
};
