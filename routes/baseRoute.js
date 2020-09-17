const path = require('path');

module.exports = {
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: path.join(__dirname, '../build/'),
            listing: false,
            index: true
        }
    }
};