const command = require('../../Data/Structures/Slash');
const { Interaction, MessageEmbed, MessageButton } = require('discord.js');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Ping del bot papu',
			category: 'Informacion',
			botPerms: [],
			userPerms: [],
			vote: false,
			nsfw: false,
			devs: false,
			enable: true,
		});
	}
	/**
	 *
	 * @param { Interaction } interaction
	 * @param { String[] } args
	 */
	async run(interaction, args) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;

		interaction.followUp({
			content: `${client.ws.ping}ms!`,
		});
	}
};
