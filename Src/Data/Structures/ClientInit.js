require('@lavaclient/queue/register');
require('dotenv').config();
const { Client, Collection, Formatters, Options } = require('discord.js');
const utils = new (require('../Utils/utils'))();
const { join } = require('path');
const NinoLink = require('./ExtendNode');
const { load } = require('@lavaclient/spotify');
const db = require('../DataBases');
const { id, secret } = require('../../Data/Utils/Stack/Lavalink');

module.exports = class NinoClient extends Client {
	constructor() {
		super({
			disableMentions: 'everyone',
			fetchAllMembers: false,
			allowedMentions: { repliedUser: false },
			intents: 16071,
			partials: ['MESSAGE', 'CHANNEL', 'USER', 'GUILD_MEMBER'],
			makeCache: Options.cacheWithLimits({
				ApplicationCommandManager: 0,
				BaseGuildEmojiManager: 0,
				ChannelManager: Infinity,
				GuildChannelManager: Infinity,
				GuildBanManager: 0,
				GuildInviteManager: 0,
				GuildManager: Infinity,
				GuildStickerManager: 0,
				MessageManager: 20,
				PermissionOverwriteManager: Infinity,
				PresenceManager: 0,
				ReactionManager: 0,
				ReactionUserManager: 0,
				RoleManager: Infinity,
				StageInstanceManager: Infinity,
				ThreadManager: Infinity,
				ThreadMemberManager: 0,
				VoiceStateManager: Infinity,
			}),
			retryLimit: 2,
			presence: {
				status: 'idle',
				activities: [
					{
						name: '🌸 inv.nino.fun | dc.nino.fun',
						type: 'WATCHING',
					},
				],
			},
		});
		this._devs = ['852630893767426079', '899339781132124220', '458083324842213376'];
		this._commands = new Collection();
		this._aliases = new Collection();
		this._slash = new Collection();
		this._cooldowns = new Collection();
		this._snipes = new Collection();
		this._guilds = false;
		this._array = [];
		this._colors = utils.colors;
		this._utils = utils;
		this._emotes = utils.emotes;
		this._up = Date.now();
		this._music = new NinoLink(this);
		this._queueHistory = new Map();
		this._triviaMap = new Map();
		this.ws.on('VOICE_SERVER_UPDATE', (data) => this._music.handleVoiceUpdate(data));
		this.ws.on('VOICE_STATE_UPDATE', (data) => this._music.handleVoiceUpdate(data));
		this._db = db;
		this._lang = require('i18n');
		this._lang.configure({
			locales: ['en', 'es'],
			directory: join(__dirname, '../../', 'i18n'),
			defaultLocale: 'en',
			retryInDefaultLocale: true,
			objectNotation: true,
			register: global,
			autoReload: true,

			logWarnFn: function (msg) {
				console.log('[Error]'.red, msg);
			},

			logErrorFn: function (msg) {
				console.log('[Error]'.red, msg);
			},

			missingKeyFn: function (locale, value) {
				return value;
			},

			mustacheConfig: {
				tags: ['{{', '}}'],
				disable: false,
			},
		});
	}
	_markdown(lang, code) {
		return Formatters.codeBlock(lang, code);
	}
	_init(token = process.env.TOKEN) {
		load({
			client: {
				id: id,
				secret: secret,
			},
			autoResolveYoutubeTracks: true,
		});
		require('../Handlers/Commands')(this);
		require('../Handlers/Events')(this);
		require('../Handlers/Slash')(this);
		require('../Handlers/Mongo');
		this.login(token);
		process.on('unhandledRejection', (error) => {
			console.log(error);
		});
	}
	_clear(username) {
		var a;
		username.indexOf('.') == username.length - 1
			? (a = username.replace('.', ''))
			: (a = username);
		return a;
	}
};
