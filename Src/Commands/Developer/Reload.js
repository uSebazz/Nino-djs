const command = require('../../Data/Structures/Commands');
const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	Util,
} = require('discord.js');
const glob = require('glob');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'reload',
			description: [],
			aliases: ['cmdr', 'cmdreload','r'],
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
	 * @param { Message } message
	 * @param { String[] } args
	 */
	async run(message, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
		client._commands.sweep(() => true);
		glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
			if (err) return console.log(err);
			filePaths.forEach(async (file) => {
				delete require.cache[require.resolve(file)];

				const pull = await require(file);
				const cmd = new pull(client);
				client._commands.set(cmd._info.name.toLowerCase(), cmd);
			});
		});
		return message.reply(
			`¡Comandos reiniciados con exito! ${client._emotes.check}`
		);
	}
}
