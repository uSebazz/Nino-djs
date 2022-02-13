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
					.setAuthor({ name: 'Estadísticas de Nino', iconURL: client.user.displayAvatarURL() })
					.setColor(client._colors.Rosado.One)
					.addField(
						'🎂 Información',
						`> Bot: **${
							client.user.tag
						}**\n> Desarolladores: **${devs}**\n> Creado: **${client.user.createdAt.toLocaleDateString()}**\n> Hosting: **[kiaura.eu](https://kiaura.eu)**`
					)
					.addField(
						'🎵 Música',
						`> Players: **${client._music.players.size}**\n> Nodos: **1**`
					)
					.addField(
						'🌸 Estadísticas',
						`> Usuarios: **${users}**\n> Canales: **${channels}**\n> Servidores: **${guilds}**\n> Uptime: **${uptime}**`
					),
			],
		});
	}
};
