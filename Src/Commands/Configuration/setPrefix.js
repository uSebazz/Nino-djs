const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	Util,
} = require('discord.js');
const Discord = require('discord.js');
const command = require('../../Data/Structures/Commands');
const guildModel = require('../../Data/DataBases/Models/Guild');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'setprefix',
			description: ['Establish a custom prefix for Nino.', 'Establece un prefijo personalizado a Nino.'],
			aliases: ['setprefix', 'prefix', 'establecer-prefijo'],
			usage: ['setprefix [prefix]', 'setprefix [prefijo]'],
			example: ['setprefix n/', 'setprefix n!'],
			userPerms: ['MANAGE_GUILD'],
			botPerms: [],
			category: 'Configuration',
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
		const prefixArgs = args[0];

		if (!prefixArgs)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.args',
						locale: lang,
					},
					{
						emoji: client._emotes.pending,
						user: client._clear(message.author.tag),
					}
				),
			});

		if (prefixArgs.length > 5)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.args2',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});

		if (/\p{Emoji}/gu.test(prefixArgs))
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.emoji',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});

		if (Discord.Util.parseEmoji(prefixArgs).id)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.emoji',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});

		if (prefixArgs.includes(String.fromCharCode(8203)))
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.charcode',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});

		const data = await guildModel.findOne({ guild: message.guild.id }).lean();
		if (prefixArgs === (data.prefix || 'n/'))
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.same',
						locale: lang,
					},
					{
						emoji: client._emotes.default,
						user: client._clear(message.author.tag),
					}
				),
			});

		if (data) {
			await guildModel
				.updateOne({
					guild: message.guild.id,
					lang: lang,
					$set: { prefix: prefixArgs },
				})
				.lean();
			message.guild.prefix = prefixArgs;
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.success',
						locale: lang,
					},
					{
						emoji: client._emotes.check,
						prefix: prefixArgs,
						user: client._clear(message.author.tag),
					}
				),
			});
		} else {
			new guildModel({
				guild: message.guild.id,
				prefix: prefixArgs,
				lang: lang,
			}).save();
			message.guild.prefix = prefixArgs;
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'config.prefix.success',
						locale: lang,
					},
					{
						emoji: client._emotes.check,
						prefix: prefixArgs,
						user: client._clear(message.author.tag),
					}
				),
			});
		}
	}
};
