const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');
const guildModel = require('../../Data/DataBases/Models/Guild');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'setlanguage',
			description: [
				'Sets bot language per server.',
				'Establece el lenguaje del bot por servidor.',
			],
			aliases: ['lang', 'setlang', 'setlan', 'langset', 'language'],
			usage: ['setlanguage [language]', 'setlanguage [idioma]'],
			example: ['setlanguage [es/en]', 'setlanguage [es/en]'],
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
		const Guild = message.guild;
		const language = args[0]?.toLocaleLowerCase() ?? '';
		if (!language)
			return message.reply(
				client._lang.__mf(
					{ phrase: 'config.lang.args', locale: lang },
					{
						user: client._clear(message.author.tag),
						emoji: client._emotes.pending,
					}
				)
			);

		if (!['es', 'en'].includes(language))
			return message.reply(
				client._lang.__mf(
					{ phrase: 'config.lang.args2', locale: lang },
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				)
			);

		if (language === 'es') {
			if (lang === 'es')
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'config.lang.argses',
							locale: lang,
						},
						{
							emoji: client._emotes.fail,
							user: client._clear(message.author.tag),
						}
					)
				);

			await guildModel.findOne({ guild: message.guild.id.toString() }).then((s, err) => {
				if (err) return console.log(err);
				if (s) {
					s.lang = 'es';
					Guild.lang = 'es';
					s.save().catch((e) => console.log(e));
				} else {
					const newGuild = new guildModel({
						guild: message.guild.id.toString(),
						lang: 'es',
					});
					Guild.lang = 'es';
					newGuild.save().catch((e) => console.log(e));
				}
			});

			return message.reply(
				client._lang.__mf(
					{ phrase: 'config.lang.es', locale: lang },
					{
						emoji: client._emotes.check,
						user: client._clear(message.author.tag),
					}
				)
			);
		}

		if (language === 'en') {
			if (lang === 'en')
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'config.lang.argsen',
							locale: lang,
						},
						{
							emoji: client._emotes.fail,
							user: client._clear(message.author.tag),
						}
					)
				);

			await guildModel.findOne({ guild: message.guild.id.toString() }).then((s, err) => {
				if (err) return console.log(err);
				if (s) {
					s.lang = 'en';
					Guild.lang = 'en';
					s.save().catch((e) => console.log(e));
				} else {
					const newGuild = new guildModel({
						guild: message.guild.id.toString(),
						lang: 'en',
					});
					Guild.lang = 'en';
					newGuild.save().catch((e) => console.log(e));
				}
			});

			return message.reply(
				client._lang.__mf(
					{ phrase: 'config.lang.en', locale: lang },
					{
						emoji: client._emotes.check,
						user: client._clear(message.author.tag),
					}
				)
			);
		}
	}
};
