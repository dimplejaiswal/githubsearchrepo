const Joi = require('joi');
const handler = require('../handlers/handleConvertPayload');

module.exports = {
    method: 'POST',
    path: '/v1/convert/payload',
    handler,
    options: {
        tags: ['api'],
        auth: false,
        payload: {
            allow: ['application/json']
        },
        validate: {
            payload: Joi.object().pattern(
                Joi.string().required(),
                Joi.array().items(
                    Joi.object().keys({
                        id: Joi.number().required(),
                        title: Joi.string().required(),
                        level: Joi.number().required(),
                        children: Joi.array(),
                        parent_id: Joi.number().allow(null),
                    })
                )
            )
        }
    }
};
