var M = require('../src/matrix_lib');


describe(`Test flatten functionality`, () => {

    test(`Test A = M.ident(2,2).flatten() == res`, () => {
        var A = M.ident(2,2).flatten();
        var res = [1,0,0,1];
        expect(JSON.stringify(A)).toBe(JSON.stringify(res));
    });
});