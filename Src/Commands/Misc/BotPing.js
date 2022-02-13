const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	MessageSelectMenu,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: ['Show bot ping', 'Muestra el ping del bot'],
			aliases: [],
			usage: [],
			example: [],
			userPerms: [],
			botPerms: [],
			category: 'Misc',
			cooldown: 10,
			blacklist: true,
			nsfw: false,
			vote: false,
			devs: false,
			enable: true,
		});
	}
	/**
	 * @param { Message } message
	 * @param { String[] } args
	 */
	async run(message, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
		const api = message.createdTimestamp - new Date();
		message.reply({
			content: client._lang.__mf(
				{
					phrase: 'misc.ping',
					locale: lang,
				},
				{
					ping: api,
					ping2: client.ws.ping,
				}
			),
		});
	}
};
