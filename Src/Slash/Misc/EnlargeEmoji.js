const command = require('../../Data/Structures/Slash');
const {
	CommandInteraction,
	MessageEmbed,
	MessageButton,
	MessageAttachment,
	Util,
} = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = class NinoSlash extends command {
	constructor(client) {
		super(client, {
			name: 'enlarge',
			description: 'Muestrá una imágen más grande de un emoji personalizado/default',
			options: [
				{
					name: 'emoji',
					description: 'Emoji el cual quieras hacer más grande',
					type: 'STRING',
					required: true,
				},
			],
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
		const { options } = interaction;

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
								user: client._clear(interaction.user.tag),
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
				content: `${client._emotes.fail} - **${interaction.user.tag}**, Un error inesperado ha ocurrido, reportalo en https://discord.gg/6ADTea2FXz`,
				ephemeral: true,
			});
			console.log(e);
		}
	}
};
