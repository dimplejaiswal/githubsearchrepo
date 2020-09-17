const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = Lab.script();

const handleConvertPayload = require('../../handlers/handleConvertPayload');
const { mockData1, mockData2 } = require('../mockData/payload');
const { mockResponse } = require('../mockData/mockResponse');

const mockH = {
    res: null,
    statuscode: 200,
    response: function(response) {
        this.res = response;
        return this;
    },
    code: function(val) {
        this.statusCode = val;
    }
}

describe("handleConvertPayload()", () => {
    it('should set 400 as the code', () => {
        handleConvertPayload({}, mockH);
        expect(mockH.statusCode).to.equal(400);
    })
    it("should map proper response for mockData1", () => {
        handleConvertPayload({ payload: mockData1 }, mockH);
        expect(mockH.statusCode).to.equal(200);
        expect(mockH.res).to.be.an.array();
        expect(mockH.res).to.have.length(1);
        expect(mockH.res).to.equal(mockResponse);
    });
    it("should map proper response for mockData2", () => {
        handleConvertPayload({ payload: mockData2 }, mockH);
        expect(mockH.statusCode).to.equal(200);
        expect(mockH.res).to.be.an.array();
        expect(mockH.res).to.have.length(1);
        expect(mockH.res).to.equal(mockResponse);
    });
});
