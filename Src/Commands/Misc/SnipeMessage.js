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
			name: 'snipe',
			description: ['Show last message delete', 'Muestra el ultimo mensaje borrado'],
			aliases: [],
			usage: ['snipe (amount)', 'snipe (cantidad)'],
			example: ['snipe 10', 'snipe 4'],
			userPerms: [],
			botPerms: [],
			category: 'Misc',
			cooldown: 4,
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

		let channel;
		if (message.mentions.channels.first()) {
			channel = message.mentions.channels.first();
		} else if (!channel) {
			channel = message.channel;
		}
		if (!channel.permissionsFor(client.user.id).has('VIEW_CHANNEL'))
			return message.reply({
				content: client._lang.__mf(
					{ phrase: 'misc.snipe.view', locale: lang },
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});
		const snipes = client._snipes.get(channel.id);
		if (!snipes)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'misc.snipe.no',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						user: client._clear(message.author.tag),
					}
				),
			});

		const snipe = +args[0] - 1 || 0;
		const target = snipes[snipe];
		if (!target)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'misc.snipe.no2',
						locale: lang,
					},
					{
						emoji: client._emotes.fail,
						snipes: snipes.length,
						user: client._clear(message.author.tag),
					}
				),
			});
		const { content, author, attachments, createdAt, msg } = target;

		const embed = new MessageEmbed()
			.setAuthor({
				name: author,
				iconURL: msg.author.displayAvatarURL({ dynamic: true }),
			})
			.setColor(client._colors.Invisible)
			.setFooter({
				text: `${client._lang.__mf(
					{ phrase: 'misc.snipe.page', locale: lang },
					{
						page: snipe + 1,
						page2: snipes.length,
					}
				)}`,
			})
			.setTimestamp(createdAt);
		if (content) {
			embed.setDescription(content);
		} else {
			embed.setDescription(
				content ? content : client._lang.__({ phrase: 'misc.snipe.nofound', locale: lang })
			);
		}
		if (attachments.length)
			embed
				.setImage(attachments[0])
				.setDescription(content ? content : String.fromCharCode(8203));

		message.reply({
			embeds: [embed],
		});
	}
};
