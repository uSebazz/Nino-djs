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
		const devs = ['899339781132124220'].map((t) => `[${client.users.cache.get(t).tag}](https://discord.com/users/${t})`)
			.join(' ');
		const users = client.guilds.cache.reduce((c, v) => c + v.memberCount, 0).toLocaleString();
		const channels = client.channels.cache.size;
		const guilds = client.guilds.cache.size;
		const uptime = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

		return message.reply({
			embeds: [
				new MessageEmbed()
					.setAuthor({ name: 'Estadísticas de Nino', iconURL: client.user.displayAvatarURL() })
					.setColor(client._colors.Rosado.One)
					.addField(
						'🎂 Información',
						`> Bot: **${client.user.tag}**\n> Desarolladores: ${devs}\n> Creado: <t:${
							(client.user.createdAt / 1000) | 0
						}:R>\n> Prefix: **${prefix}**`
					)
					.addField(
						'🎵 Música',
						`> Players: **${client._music.players.size}**\n> Nodos: **1**`
					)
					.addField(
						'🌸 Estadísticas',
						`> Usuarios: **${users}**\n> Canales: **${channels}**\n> Servidores: **${guilds}**\n> Uptime: <t:${uptime}:R>`
					),
			],
		});
	}
};
