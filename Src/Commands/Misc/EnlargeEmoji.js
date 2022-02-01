const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	MessageSelectMenu,
	Util,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');
const { parse } = require('twemoji-parser');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'emoji',
			description: ['Enlarge any emoji you want', 'Amplía el emoji que quieras'],
			aliases: ['jumbo', 'emoji-jumbo', 'enlarge'],
			usage: ['emoji [emoji]', 'emoji [emoji]'],
			example: ['emoji :thumbsup:', 'emoji :happy:'],
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
		const emoji = args[0];

		if (!emoji)
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'misc.emoji.args',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				)
			);
		const custom = Util.parseEmoji(emoji);
		if (custom.id) {
			let emoji = `https://cdn.discordapp.com/emojis/${custom.id}.${
				custom.animated ? 'gif' : 'png'
			}?size=2048`;

			const emoji2 = new MessageAttachment(emoji, null);

			return message.reply({
				files: [emoji2],
			});
		} else {
			let parsed = parse(emoji, { assetType: 'png' });
			if (!parsed[0]) {
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'misc.emoji.args2',
							locale: lang,
						},
						{
							emoji: client._emotes.fail,
							user: client._clear(message.author.tag),
						}
					)
				);
			}
			const parsed2 = `${parsed[0].url}?size=2048`;
			const parsedfinal = new MessageAttachment(parsed2, null);
			return message.reply({
				files: [parsedfinal],
			});
		}
	}
};
