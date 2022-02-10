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
			name: 'leave',
			description: ['Ends the current server music', 'Termina la música actual del servidor'],
			aliases: [],
			usage: ['leave'],
			example: ['leave'],
			userPerms: [],
			botPerms: [],
			category: 'Music',
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

		if (client._triviaMap.has(message.guildId))
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'music.play.trivia',
						locale: lang,
					},
					{
						user: client._clear(message.author.tag),
						emoji: client._emotes.fail,
					}
				)
			);

		const player = client._music.players.get(message.guildId);

		if (!player)
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'music.leave.player',
						locale: lang,
					},
					{
						user: client._clear(message.author.tag),
						emoji: client._emotes.fail,
					}
				)
			);

		const { channel } = message.member.voice;
		if (!channel)
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'music.play.channel',
						locale: lang,
					},
					{
						user: client._clear(message.author.tag),
						emoji: client._emotes.fail,
					}
				)
			);

		if (player && player.channelId !== channel.id)
			return message.reply(
				client._lang.__mf(
					{
						phrase: 'music.play.igual',
						locale: lang,
					},
					{
						user: client._clear(message.author.tag),
						emoji: client._emotes.fail,
						tag: client.user.tag,
					}
				)
			);

		player.disconnect();
		client._music.destroyPlayer(player.guildId);
		return message.react(client._emotes.check);
	}
};
