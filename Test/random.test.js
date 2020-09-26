var M = require('../src/matrix_lib');

describe(`Test random functionality`, () => {

    test('Test M.addNoise()', () => {
        M.execute(function(M){
            var A = M.rand(2,2).checkBounds(-1,1);
            var res = new M([[0,0],[0,0]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute A = A*2;`, () => {
        M.execute(function(M){
            var A = M.randn(2,2).checkBounds(-1e9,1e9);
            var res = new M([[0,0],[0,0]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test M.ident(2,2).addNoise(1).checkBounds(-1,1)', () => {
        M.execute(function(M){
            var A = M.zeros(2,2).addNoise(1).checkBounds(-1,1);
            var res = new M([[0,0],[0,0]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute M.ident(2,2).addNormalNoise(1).checkBounds(-1e9,1e9);`, () => {
        M.execute(function(M){
            var A =  M.zeros(2,2).addNormalNoise(1).checkBounds(-1e9,1e9);
            var res = new M([[0,0],[0,0]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

});