const handleConvertPayload = (request, h) => {
    if (!request || !request.payload) return h.response({}).code(400);
    const refObj = {};
    const res = [];
    const pendingArray = [];
 
    const responseMapping = (list) => {
        for (let i = 0; i < list.length; i++) {
            const { id, parent_id } = list[i];
            refObj[id] = list[i];
            if (!parent_id) {
                res.push(list[i]);
            } else if (refObj[parent_id]) {
                    refObj[parent_id].children.push(list[i]);
            } else {
                pendingArray.push(list[i]);
            }
        }
    };
    
    for (const key of Object.keys(request.payload)) {
        responseMapping(request.payload[key]);
    }

    if (pendingArray.length > 0) {
        responseMapping(pendingArray);
    }

    return h.response(res).code(200);
};

module.exports = handleConvertPayload;
