const command = require('../../Data/Structures/Slash');
const { CommandInteraction, MessageEmbed, MessageButton } = require('discord.js');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Muestra mi latencia',
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
	async run(interaction, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
		try {
			interaction.reply({
				content: client._lang.__mf(
					{
						phrase: 'misc.ping',
						locale: lang,
					},
					{
						ping: interaction.createdTimestamp - Date.now(),
						ping2: client.ws.ping,
					}
				),
				ephemeral: true,
			});
		} catch (e) {
			await interaction.reply({
				content: `${client._emotes.fail} - **${interaction.user.tag}**, Un error inesperado ha ocurrido, reportalo en https://discord.gg/6ADTea2FXz`,
				ephemeral: true,
			});
		}
	}
};
