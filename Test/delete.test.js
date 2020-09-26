var M = require('../src/matrix_lib');


describe(`Test delete functionality\r\n`, () => {

    test(`Test A.deleteRow(0) == res`, () => {
        var A = M.ident(3,3)
        A = A.deleteRow(0);
        var res = M.make([[0,1,0],[0,0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.deleteRow(A,0) == res`, () => {
        var A = M.ident(3,3)
        A = M.deleteRow(A,0);
        var res = M.make([[0,1,0],[0,0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test  A = A.deleteRows(0,1); == res`, () => {
        var A = M.ident(3,3)
        A = A.deleteRows(0,1);
        var res = M.make([[0,0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test  A = M.deleteRows(A,0,1); == res`, () => {
        var A = M.ident(3,3)
        A = M.deleteRows(A,0,1);
        var res = M.make([[0,0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test  A = A.deleteCol(0); == res`, () => {
        var A = M.ident(3,3)
        A = A.deleteCol(0);
        var res = M.make([[0,0],[1,0],[0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test  A = M.deleteCol(A,0); == res`, () => {
        var A = M.ident(3,3)
        A = M.deleteCol(A,0);
        var res = M.make([[0,0],[1,0],[0,1]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

});