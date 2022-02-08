module.exports = {
	convertTime: function (duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		if (duration < 3600000) {
			return minutes + ':' + seconds;
		} else {
			return hours + ':' + minutes + ':' + seconds;
		}
	},
	timeString: function (timeObj) {
		if (timeObj[1] === true) return timeObj[0];
		return `${timeObj.hours ? timeObj.hours + ':' : ''}${
			timeObj.minutes ? timeObj.minutes : '00'
		}:${timeObj.seconds < 10 ? '0' + timeObj.seconds : timeObj.seconds ? timeObj.seconds : '00'}`;
	},

	millisecondsToTimeObj: function (ms) {
		({
			seconds: Math.floor((ms / 1000) % 60),
			minutes: Math.floor((ms / (1000 * 60)) % 60),
			hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
		});
	},
};
