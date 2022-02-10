const command = require('../../Data/Structures/Commands');
const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	Util,
} = require('discord.js');
const Discord = require('discord.js');
const { promisify, inspect } = require('util');
const { exec } = require('child_process');

module.exports = class NinoCommands extends command {
	constructor(client) {
		super(client, {
			name: 'eval',
			description: [],
			aliases: ['e', 'evaluate'],
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
	async run(message, args, lang, prefix) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;
		let evalued = 'undefined';
		switch (args[0]?.toLowerCase() ?? '') {
			case '.a': {
				if (!args[1])
					return message.channel.send({
						content: 'Proporcione un código',
					});
				try {
					evalued = await eval('(async() => {\n' + args.slice(1).join(' ') + '\n})();');
					evalued = inspect(evalued, { depth: 0 });
				} catch (err) {
					evalued = err.toString();
				}
				break;
			}
			case '.e': {
				if (!args[1])
					return message.reply({
						content: 'Proporcione un código',
					});
				evalued = args.slice(1).join(' ');
				try {
					const { stdout, stderr } = await promisify(exec)(evalued);
					if (!stdout && !stderr) {
						return message.reply({
							embeds: [
								new MessageEmbed()
									.setDescription(`Comando invalido para ejecutar en la terminal.`)
									.setColor(client._colors.Invisible),
							],
						});
					}
					if (stdout) evalued = stdout;
					if (stderr) evalued = stderr;
				} catch (err) {
					evalued = err.toString();
				}
				break;
			}
			default: {
				if (!args[0])
					return message.channel.send({
						content: 'Proporcione un código',
					});
				try {
					evalued = await eval(args.join(' '));
					evalued = inspect(evalued, { depth: 0 }).replace(client.token, 'Que intentas');
				} catch (err) {
					evalued = err.toString();
				}
				break;
			}
		}
		const btn = new MessageButton()
			.setLabel('Delete')
			.setEmoji(client._emotes.eval)
			.setCustomId(`1`)
			.setStyle('SECONDARY');

		const row = new MessageActionRow().addComponents([btn]);
		const mensaje = Discord.Formatters.codeBlock('js', evalued.slice(0, 1950), {
			code: args[0]?.toLowerCase() === '-exec' ? 'exec' : '```js\n```',
		});

		const msg = await message.channel.send({
			content: mensaje,
			components: [row],
		});

		const col = await msg.createMessageComponentCollector({
			filter: (i) => i.user.id == message.author.id,
			time: 200000,
		});

		try {
			col.on('collect', async (button) => {
				if (button.customId === '1') {
					msg.delete();
					/* await button.deferUpdate()
          await msg.channel.s({
            embeds: [embed.setDescription(`${client.emotes.spscrool} Delete`)]
          })
*/
				}
			});
		} catch {}
		return msg;
	}
};
