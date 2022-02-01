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
const OwnerSchema = require('../../Data/DataBases/Models/Owner');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			description: [],
			aliases: ['bl'],
			usage: [],
			example: [],
			userPerms: [],
			botPerms: [],
			category: '',
			cooldown: 0,
			blacklist: false,
			nsfw: false,
			vote: false,
			devs: true,
			enable: true,
		});
	}
	/**
	 *
	 * @param { Message } message
	 * @param { String[] } args
	 */
	async run(message, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;

		switch (args[0]?.toLowerCase() ?? '') {
			case 'add': {
				let user = message.mentions.users.first(2)[1]
					? message.mentions.users.first(2)[1]
					: message.mentions.users.first() ||
					  client.users.cache.get(args[1]) ||
					  client.users.cache.find(
							(u) => u.tag === args.join(' ') || u.username === args.join(' ')
					  ) ||
					  client.users.fetch(args[1]);
				const reason =
					args[2] ||
					client._lang.__({ phrase: 'developer.blacklist.reason', locale: lang.lang });

				if (!user)
					return message.reply(
						`${client._emotes.pending} - **${message.author.tag}**, Proporciona la id de un usuario.`
					);

				OwnerSchema.findOne({ user: user.id }, async (err, data) => {
					if (err) throw err;
					if (data) {
						message.reply(
							`${client._emotes.info} - **${message.author.tag}**, Este usuario ya esta en la blacklist.`
						);
					} else {
						new OwnerSchema({
							user: user.id,
							time: Date.now(),
						}).save();
						message.reply(
							`${client._emotes.check} - **${message.author.tag}**, El usuario **${user.username}** ha sido añadido a la blacklist!`
						);
					}
				}).lean();
				break;
			}
			case 'remove': {
				let user = message.mentions.users.first(2)[1]
					? message.mentions.users.first(2)[1]
					: message.mentions.users.first() ||
					  client.users.cache.get(args[1]) ||
					  client.users.cache.find(
							(u) => u.tag === args.join(' ') || u.username === args.join(' ')
					  ) ||
					  client.users.fetch(args[1]);

				if (!user)
					return message.reply(
						`${client._emotes.pending} - **${message.author.tag}**, Proporciona la id de un usuario.`
					);

				OwnerSchema.findOne({ user: user.id }, async (err, data) => {
					if (err) throw err;
					if (data) {
						await OwnerSchema.deleteOne({
							user: user.id,
						});
						return message.reply(
							`${client._emotes.check} - **${message.author.tag}**, El usuario **${user.username}** se ha removido de la blacklist.`
						);
					} else {
						return message.reply(
							`${client._emotes.fail} - **${message.author.tag}**, Este usuario no esta en la blacklist.`
						);
					}
				});
				break;
			}
			default: {
				if (!args[0])
					return message.reply(
						`${client._emotes.pending} - **${message.author.tag}**, Proporciona una opcion. (add/remove)`
					);
				break;
			}
		}
	}
};
