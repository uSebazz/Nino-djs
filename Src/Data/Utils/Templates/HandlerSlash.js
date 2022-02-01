const command = require('../../Data/Structures/Slash');
const { CommandInteraction, MessageEmbed, MessageButton } = require('discord.js');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: '',
			description: '',
			//options: [],
			category: '',
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
	 * @param { CommandInteraction } interaction
	 * @param { String[] } args
	 */
	async run(interaction, args) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
	}
};
