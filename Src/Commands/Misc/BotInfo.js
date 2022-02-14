const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');

class BotInformation extends command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			description: ['Check a Nino info', 'Muestra la información de Nino.'],
			aliases: ['stats', 'botstats', 'bot', 'status'],
			usage: [],
			example: [],
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
	async run(message, args, lang, prefix) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
		const devs = ['899339781132124220']
			.map((t) => `[${client.users.cache.get(t).tag}](https://discord.com/users/${t})`)
			.join(' ');
		const users = client.guilds.cache.reduce((c, v) => c + v.memberCount, 0).toLocaleString();
		const channels = client.channels.cache.size;
		const guilds = client.guilds.cache.size;

		//———————————————[Uptime]———————————————//
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		let uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s.`;
		//———————————————[Uptime]———————————————//

		return message.reply({
			embeds: [
				new MessageEmbed()
					.setAuthor({
						name: client._lang.__({
							phrase: 'misc.bot.one',
							locale: lang,
						}),
						iconURL: client.user.displayAvatarURL(),
					})
					.setColor(client._colors.Rosado.One)
					.addField(
						client._lang.__({
							phrase: 'misc.bot.field.one',
							locale: lang,
						}),
						client._lang.__mf(
							{
								phrase: 'misc.bot.field.two',
								locale: lang,
							},
							{
								bot: client.user.tag,
								dev: devs,
								date: client.user.createdAt.toLocaleString(),
							}
						)
					)
					.addField(
						client._lang.__({
							phrase: 'misc.bot.field2.one',
							locale: lang,
						}),
						client._lang.__mf(
							{
								phrase: 'misc.bot.field2.two',
								locale: lang,
							},
							{
								players: client._music.players.size,
							}
						)
					)
					.addField(
						client._lang.__({
							phrase: 'misc.bot.field3.one',
							locale: lang,
						}),
						client._lang.__mf(
							{
								phrase: 'misc.bot.field3.two',
								locale: lang,
							},
							{
								users: users,
								channels: channels,
								guilds: guilds,
								up: uptime,
							}
						)
					),
			],
		});
	}
}
module.exports = BotInformation;
