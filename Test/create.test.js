var M = require('../src/matrix_lib');


describe(`Test create functionality\r\n`, () => {

    test(`Test M.range(0,1,3) == res`, () => {
        var A = M.range(0,1,3);
        var res = M.make([[0],[1],[2],[3]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.zeros(3) == res`, () => {
        var A = M.zeros(3);
        var res = M.make([[0],[0],[0]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.ones(2,2) == res`, () => {
        var A = M.ones(2,2);
        var res = M.make([[1,1],[1,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.ident(2,2) == res`, () => {
        var A = M.ident(2,2);
        var res = M.make([[1,0],[0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.clone(A) == res`, () => {
        var A = M.ident(2,2);
        var B = A.clone();
        var C = B.clone();
        A = 0;
        expect(JSON.stringify(B.value)).toBe(JSON.stringify(C.value));
    });

});