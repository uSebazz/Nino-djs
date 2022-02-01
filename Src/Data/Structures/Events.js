module.exports =  class events {
	async run(...args) {
		try {
			await this.run(...args);
		} catch (e) {
			throw e;
		}
	}
};
