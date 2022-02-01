const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'banana',
			description: [
				'Shows how long the banana is...',
				'Muestra que tan grande es tu banana?...',
			],
			aliases: [],
			usage: ['banana (@user)', 'banana (@usuario)'],
			example: ['banana @09X18', 'banana @Isaacx'],
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

		const random = Math.floor(Math.random() * 35);

		let member =
			message.mentions.members.first() ||
			message.guild.members.cache.find(
				(a) =>
					a.user.tag.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') ||
					a.user.username.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') ||
					a.displayName.toLowerCase().includes(args[0]?.toLowerCase() ?? '')
			) ||
			message.guild.members.cache.get(args[0]?.toLowerCase() ?? '');

		if (!args[0]) {
			member = message.member;
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'misc.banana.author',
						locale: lang,
					},
					{
						user: client._clear(member.user.username),
						random: random,
					}
				),
			});
		}
		if (member == null)
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'error.find',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				)
			);

		try {
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'misc.banana.other',
						locale: lang,
					},
					{
						user: client._clear(member.user.username),
						random: random,
					}
				),
			});
		} catch (e) {
			message.reply(
				client._lang.__mf(
					{
						phrase: 'error.find',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				)
			);
		}
	}
}
