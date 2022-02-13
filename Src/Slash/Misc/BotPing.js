const command = require('../../Data/Structures/Slash');
const { InteractionCommand, MessageEmbed, MessageButton } = require('discord.js');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: '📡 Muestra la latencia actual del bot',
			options: [
				{
					name: 'usuario',
					description: 'Mira el ping del usuario / bot',
					type: 'USER',
					required: false,
				},
			],
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
	 * @param { InteractionCommand } interaction
	 * @param { String[] } args
	 */
	async run(interaction, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;

		let user = interaction.options.getUser('usuario');

		if (user) {
			interaction.followUp({
				content: `El ping de **${user.tag}** es de **${Math.round(Math.random() * 100)}**`,
			});
		} else {
			interaction.followUp({
				content: client._lang.__mf(
					{
						phrase: 'misc.ping',
						locale: lang,
					},
					{
						ping: interaction.createdAtTimestamp - Date.now(),
						ping2: client.ws.ping,
					}
				),
			});
		}
	}
};
