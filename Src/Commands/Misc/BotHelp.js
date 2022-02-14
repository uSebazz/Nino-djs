const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
	MessageSelectMenu,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');

class HelpPanel extends command {
	constructor(client) {
		super(client, {
			name: 'help',
			description: ['Show Nino menu help', 'Muestra el menú de ayuda de Nino'],
			aliases: ['h', 'ayuda', 'cmds', 'commands'],
			usage: ['help (command)', 'help (Comando)'],
			example: ['help help', 'help play'],
			userPerms: [],
			botPerms: [],
			category: 'Misc',
			cooldown: 5,
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
		const misc1 = client._commands.filter((y) => y._info.category === 'Misc').size;
		const config1 = client._commands.filter((y) => y._info.category === 'Configuration').size;
		const music1 = client._commands.filter((y) => y._info.category === 'Music').size;
		const embed = new MessageEmbed()
			.setDescription(
				client._lang.__mf(
					{
						phrase: 'misc.help.one',
						locale: lang,
					},
					{
						prefix: prefix,
						user: client._clear(message.author.username),
					}
				)
			)
			.addField(
				client._lang.__({ phrase: 'misc.help.two.a', locale: lang }),
				client._lang.__mf(
					{ phrase: 'misc.help.two.b', locale: lang },
					{
						misc: misc1,
						config: config1,
						music: music1,
					}
				)
			)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
			.setFooter({
				text: client._lang.__({ phrase: 'misc.help.three', locale: lang }),
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.setColor(client._colors.Rosado.One);

		if (!args[0]) {
			return message.reply({
				embeds: [embed],
				components: [
					new MessageActionRow().addComponents(
						new MessageSelectMenu()
							.setCustomId('1')
							.setPlaceholder(client._lang.__({ phrase: 'misc.help.menu.a', locale: lang }))
							.setMaxValues(1)
							.setMinValues(1)
							.addOptions([
								{
									label: 'Configuración',
									description: null,
									value: '1',
									emoji: client._emotes.burrito,
								},
							])
					),
				],
			});
		} else {
			return;
		}
	}
}
module.exports = HelpPanel;
