const Event = require('../../Data/Structures/Events');
const client = new (require('../../Data/Structures/ClientInit'))();
const colors = require('colors');
const { Message } = require('discord.js');

module.exports = class event extends Event {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {client} client
	 * @param {Message} message
	 */
	run = async (client, message) => {
		if (message.partial) return;
		let snipes = client._snipes.get(message.channel.id) || [];
		if (snipes.length > 10) snipes = snipes.slice(0, 9);

		snipes.unshift({
			author: message.author.tag,
			content: message.content,
			msg: message,
			attachments: [...message.attachments.values()].map((a) => a.proxyURL),
			createdAt: message.createdTimestamp,
		});
		client._snipes.set(message.channel.id, snipes);
	};
};
