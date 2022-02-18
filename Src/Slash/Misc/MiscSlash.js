const command = require('../../Data/Structures/Slash');
const {
	CommandInteraction,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	MessageSelectMenu,
	Util,
} = require('discord.js');
const { parse } = require('twemoji-parser');

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
				{
					name: 'enlarge',
					description: 'Enlarga el emoji que quieras 😁',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'emoji',
							description: 'Emoji el cual quieras alargar',
							type: 'STRING',
							required: true,
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
				break;
			}
			case 'enlarge': {
				let emoji = options.getString('emoji');
				try {
					const custom = Util.parseEmoji(emoji);
					if (custom.id) {
						let emoji = `https://cdn.discordapp.com/emojis/${custom.id}.${
							custom.animated ? 'gif' : 'png'
						}?size=2048`;

						const emoji2 = new MessageAttachment(emoji, null);

						await interaction.reply({
							files: [emoji2],
							ephemeral: false,
						});
					} else {
						let parsed = parse(emoji, { assetType: 'png' });
						if (!parsed[0]) {
							return interaction.reply({
								content: client._lang.__mf(
									{
										phrase: 'misc.emoji.args2',
										locale: lang,
									},
									{
										emoji: client._emotes.fail,
										user: client._clear(message.author.tag),
									}
								),
								ephemeral: false,
							});
						}

						const parsed2 = `${parsed[0].url}?size=2048`;
						const parsedfinal = new MessageAttachment(parsed2, null);

						await interaction.reply({ files: [parsedfinal] });
					}
				} catch (e) {
					await interaction.reply({
						content: `${client._emotes.fail} - **${interaction.user.tag}**, Un error inesperado ha ocurrido, reportalo en https://discord.gg/yscJghJKBM`,
						ephemeral: true,
					});
				}
				break;
			}
		}
	}
};
