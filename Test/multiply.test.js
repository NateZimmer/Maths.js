var M = require('../src/matrix_lib');

describe(`Test multiply functionality`, () => {

    test(`Test execute A = M.multiply(A,B).multiply(A);`, () => {

        M.execute(function(M){
            var A = new M([[2,0],[0,2]]);
            var B = new M([[2,0],[0,2]]);
            var res = new M([[8,0],[0,8]]);
            A = M.multiply(A,B).multiply(A);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute A = A*2;`, () => {

        M.execute(function(M){
            var A = M.ident(2,2);
            var res = new M([[2,0],[0,2]]);
            A = A*2;
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute B = A * C`, () => {
        M.execute(function(M){
            var A = M.ident(2,2);
            var res = new M([[4,0],[0,4]]);
            var C = 2 * M.ident(2,2);
            A = A * 2;
            var B = A * C;
            expect(JSON.stringify(B.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute A = M.range(3) * M.range(3)`, () => {
        M.execute(function(M){
            var A = M.range(3) * M.range(3);
            var res = new M([[0],[1],[4]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });
    
});