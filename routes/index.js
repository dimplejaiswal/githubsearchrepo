const convertPayload = require('./convertPayload');
const baseRoute = require('./baseRoute');

module.exports = [
    baseRoute,
    convertPayload,
];
