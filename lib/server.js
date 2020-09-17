const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
	info: {
		title: 'API Documentation',
		description: 'API documentation.',
		version: 'v1'
	}
};

const init = async (routes) => {
	const server = Hapi.Server({
		host: 'localhost',
		port: process.env.PORT || '8000'
	});

    await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);
	server.route(routes);

	await server.start();
	return server;
};

module.exports = init;