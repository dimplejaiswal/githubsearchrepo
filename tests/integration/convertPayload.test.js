const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const init = require('../../lib/server');
const routes = require('../../routes');
const { mockData1 } = require('../mockData/payload');

describe('POST /v1/convert/payload', () => {
    let server;

    beforeEach(async () => {
        server = await init(routes);
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/convert/payload',
            payload: mockData1
        });
        expect(res.statusCode).to.equal(200);
    });
});