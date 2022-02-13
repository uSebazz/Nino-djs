class NinoSlash {
	constructor(
		client,
		{
			name = null,
			description = null,
			options = [],
			category = null,
			botPerms = [],
			userPerms = [],
			nsfw = false,
			vote = false,
			devs = false,
			enable = true,
		}
	) {
		this.client = client;
		this._info = {
			name,
			description,
			options,
			category,
		};
		this._config = {
			userPerms,
			botPerms,
			nsfw,
			vote,
			devs,
			enable,
		};
	}
}
module.exports = NinoSlash;
