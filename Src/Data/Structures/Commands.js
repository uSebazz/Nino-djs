class NinoCommands {
	constructor(
		client,
		{
			name = null,
			aliases = [],
			description = [],
			usage = [],
			example = [],
			category = null,
			cooldown = 0,
			botPerms = [],
			userPerms = [],
			blacklist = true,
			nsfw = false,
			vote = false,
			devs = false,
			enable = true,
		}
	) {
		this.client = client;
		this._info = {
			name,
			aliases,
			description,
			usage,
			example,
			category,
		};
		this._config = {
			userPerms,
			botPerms,
			blacklist,
			nsfw,
			cooldown,
			vote,
			devs,
			enable,
		};
	}
}
module.exports =  NinoCommands;
