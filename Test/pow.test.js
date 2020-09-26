var M = require('../src/matrix_lib');


describe(`Test pow functionality`, () => {

    test(`Test M.ident(2).multiply(2).pow(2) == res`, () => {
        var A = M.ident(2).multiply(2).pow(2);
        var res = M.make([[4,0],[0,4]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.ident(2).multiply(2).pow(2) == res`, () => {
        var A = M.ident(2).multiply(2);
        A = M.pow(A,2)
        var res = M.make([[4,0],[0,4]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.ident(2).multiply(2).square() == res`, () => {
        var A = M.ident(2).multiply(2).square();
        var res = M.make([[4,0],[0,4]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.ident(2).multiply(2).square() == res`, () => {
        var A = M.ident(2).multiply(2);
        A = M.square(A,2)
        var res = M.make([[4,0],[0,4]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });


});