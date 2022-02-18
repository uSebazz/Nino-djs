const command = require('../../Data/Structures/Slash');
const { CommandInteraction, MessageEmbed, MessageButton } = require('discord.js');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: 'misc',
			description: 'Muestra los comandos de la categoria miscelánea',
			options: [
				{
					name: 'ping',
					description: '📡 Muestra la latencia del bot',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'usuario',
							description: 'Mira el ping del usuario / bot',
							type: 'USER',
							required: false,
						},
					],
				},
			],
			category: 'Misc',
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
		const { options } = interaction;

		switch (options.getSubcommand()) {
			case 'ping': {
				let user = options.getUser('usuario');
				try {
					if (user) {
						interaction.reply({
							content: `El ping de **${user.tag}** es de **${Math.round(
								Math.random() * 100
							)}**`,
							ephemeral: false,
						});
					} else {
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
					}
				} catch (e) {
					await interaction.reply({
						content: `${client._emotes.fail} - **${interaction.user.tag}**, Un error inesperado ha ocurrido, reportalo en https://discord.gg/yscJghJKBM`,
						ephemeral: true,
					});
				}
			}
		}
	}
};
