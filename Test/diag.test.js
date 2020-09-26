var M = require('../src/matrix_lib');


describe(`Test diag functionality\r\n`, () => {

    test(`Test A = M.range(0,1,2).diag() == res`, () => {
        var A = M.range(3).diag()
        var res = M.make([[0,0,0],[0,1,0],[0,0,2]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });
});