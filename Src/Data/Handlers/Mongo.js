const Mongo = require('mongoose');

Mongo.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
Mongo.connection.on('connected', () => {
	console.log(`[Mongo]:`.green, 'Conectado.');
});
Mongo.connection.on('disconnected', () => {
	console.log(`[Mongo]:`.yellow, 'Desconectado.');
});
Mongo.connection.on('err', (err) => {
	console.log(`[Mongo]:`.red, 'Error:', `${err}`.grey);
});
