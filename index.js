const init = require('./lib/server');
const routes = require('./routes');

init(routes)
	.then(server => {
		console.log(`Server listening on ${server.info.uri}`);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});