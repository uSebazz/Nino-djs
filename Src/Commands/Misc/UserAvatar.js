const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');

class UserAvatar extends command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			description: ['Display user avatar', 'Muestra el avatar de una persona'],
			aliases: ['av'],
			usage: ['avatar (user)', 'avatar (usuario)'],
			example: ['avatar @09X18', 'avatar @Isaacx'],
			userPerms: [],
			botPerms: [],
			category: 'Misc',
			cooldown: 0,
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
			return message.reply({
				embeds: [
					new MessageEmbed()
						.setImage(message.member.displayAvatarURL({ dynamic: true, size: 2048 }))
						.setColor(client._colors.Invisible),
				],
			});
		}

		try {
			return message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(
							`[**${member.user.username}**](${member.displayAvatarURL({
								dynamic: true,
								size: 2048,
							})})`
						)
						.setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
						.setColor(client._colors.Invisible),
				],
			});
		} catch {
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'misc.avatar.error',
						locale: lang,
					},
					{
						emoji: client._emotes.burrito,
					}
				)
			);
		}
	}
}
module.exports = UserAvatar;
