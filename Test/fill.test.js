var M = require('../src/matrix_lib');


describe(`Test adding fill functionality`, () => {

    test(`Test Matrixs.fill(A,2,4) == res`, () => {
        var A = M.range(8);
        A = M.fill(A,2,4);
        var res = M.make([[0,1,2,3],[4,5,6,7]])
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test A.fill(2,4) == res`, () => {
        var A = M.range(8);
        A = A.fill(2,4);
        var res = M.make([[0,1,2,3],[4,5,6,7]])
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

});