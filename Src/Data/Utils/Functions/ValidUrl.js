var isYouTubeVideoURL = (arg) =>
	arg.match(/^(http(s)?:\/\/)?(m.)?((w){3}.)?(music.)?youtu(be|.be)?(\.com)?\/.+/);

var isYouTubePlaylistURL = (arg) =>
	arg.match(/^https?:\/\/(music.)?(youtube.com)\/playlist(.*)$/);

var isSpotifyURL = (arg) => arg.match(/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/);

module.exports = {
	isYouTubeVideoURL,
	isYouTubePlaylistURL,
	isSpotifyURL,
};
