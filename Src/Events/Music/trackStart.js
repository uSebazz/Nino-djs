const {
	Message,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	MessageAttachment,
} = require('discord.js');
const events = require('../../Data/Structures/Events');
const Client = new (require('../../Data/Structures/ClientInit'))();
const { timeString, millisecondsToTimeObj } = require('../../Data/Utils/Functions/Functions');
const { LoopType, Shuff } = require('@lavaclient/queue');

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 * @param {Message} message
	 */
	run = async (client, queue, title, uri, length, isSeekable) => {
		if (client._triviaMap.has(queue.channel.guildId)) return;
		const queueHistory = client._queueHistory.get(queue.channel.guildId);

		if (queue.loop.type == LoopType.Queue) {
			queue.tracks.push(queue.previous);
		}

		if (!queueHistory) {
			client._queueHistory.set(queue.player.guildId, []);
		}

		client._queueHistory.set(queue.player.guildId, [
			{
				title,
				uri,
				length,
				isSeekable,
			},
			...client._queueHistory.get(queue.player.guildId),
		]);

		let position;
		let length2 = queue.current.length;
		let trackLength = timeString(millisecondsToTimeObj(length2));
		const req = `<@${queue.current.requester}>`;

		if (!queue.current.isSeekable) {
			trackLength = 'Live Stream';
			position = undefined;
		}

		const lang1 = client._lang.__({
			phrase: 'interactions.buttons.track.1',
			locale: queue.channel.guild.lang,
		});
		const lang2 = client._lang.__({
			phrase: 'interactions.buttons.track.2',
			locale: queue.channel.guild.lang,
		});
		const lang3 = client._lang.__({
			phrase: 'interactions.buttons.track.3',
			locale: queue.channel.guild.lang,
		});
		const lang4 = client._lang.__({
			phrase: 'interactions.buttons.track.4',
			locale: queue.channel.guild.lang,
		});
		const button1 = new MessageButton().setCustomId('1').setLabel(lang1).setStyle('SECONDARY');
		const button2 = new MessageButton().setCustomId('2').setLabel(lang2).setStyle('DANGER');
		const button3 = new MessageButton().setCustomId('3').setLabel(lang3).setStyle('PRIMARY');
		const button4 = new MessageButton().setCustomId('4').setLabel(lang4).setStyle('PRIMARY');

		const embed = new MessageEmbed()
			.setDescription(
				client._lang.__mf(
					{
						phrase: 'events.music.track',
						locale: queue.channel.guild.lang,
					},
					{
						emoji: client._emotes.music,
						track: queue.current.title,
						uri: queue.current.uri,
						requester: req,
						time: trackLength,
					}
				)
			)
			.setColor('WHITE')
			.setThumbnail(`https://img.youtube.com/vi/${queue.current.identifier}/maxresdefault.jpg`);

		const msg = await queue.channel.send({
			embeds: [embed],
			components: [new MessageActionRow().addComponents([button1, button2, button3, button4])],
		});
		const col = msg.createMessageComponentCollector({
			filter: (int) => {
				if (
					int.guild.me.voice.channel &&
					int.guild.me.voice.channelId === int.member.voice.channelId
				)
					return true;
				else {
					int.reply({
						content: client._lang.__mf(
							{
								phrase: 'interactions.buttons.music',
								locale: queue.channel.guild.lang,
							},
							{
								emoji: client._emotes.burrito,
								channel: int.guild.me.voice.channel,
							}
						),
						ephemeral: true,
					});
					return false;
				}
			},
			time: queue.current.length,
		});

		const player = client._music.players.get(queue.channel.guild.id);

		col.on('collect', async (int) => {
			switch (int.customId) {
				case '1': {
					if (player.queue.tracks.length === 0 || player.queue.tracks.length === 1) {
						return int.reply({
							content: 'No se puede manito.',
							ephemeral: true,
						});
					} else {
						player?.queue.shuffle();
						await int.reply({ content: 'lista revolvida', ephemeral: true });
					}
					break;
				}
				case '2': {
					player.disconnect();
					client._music.destroyPlayer(player.guildId);
					(await int.reply({ content: 'Me fui manito', ephemeral: true })) && col.stop();
					break;
				}
				case '3': {
					player.pause(!player.paused);
					text = player.paused
						? client._lang.__({
								phrase: 'events.music.b.a.1',
								locale: queue.channel.guild.lang,
						  })
						: client._lang.__({
							phrase: 'events.music.b.a.2',
							locale: queue.channel.guild.lang,
					  });
					await int.reply({ content: `Esta verga se ${text}`, ephemeral: true });
					break;
				}
				case '4': {
					if (player.queue.tracks.length === 0) {
						await int.reply({
							content: client._lang.__({
								phrase: 'events.music.b.1',
								locale: queue.channel.guild.lang,
							}),
							ephemeral: true,
						});
					} else {
						player?.queue.next() &&
							int.reply({
								content: client._lang.__({
									phrase: 'events.music.b.2',
									locale: queue.channel.guild.lang,
								}),
								ephemeral: true,
							});
						await col.stop();
					}
					break;
				}
			}
		});

		col.on('end', async () => {
			msg.edit({
				components: [],
			});
			if (player.queue.tracks.length === 0) {
				return;
			} else {
				setTimeout(() => {
					msg.delete();
				}, 10000);
			}
		});
	};
};
