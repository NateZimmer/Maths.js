var M = require('../src/matrix_lib');

describe(`Test shape functionality`, () => {

    test('Test push', () => {
        M.execute(function(M){
            var A = M.range(3).push(3);
            var res = new M([[0],[1],[2],[3]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test catV`, () => {
        M.execute(function(M){
            var A = M.range(3).catV(3);
            var res = new M([[0],[1],[2],[3]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test catH', () => {
        M.execute(function(M){
            var A = M.range(3).transpose().catH(3);
            var res = new M([[0,1,2,3]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test shape proto', () => {
        M.execute(function(M){
            var A = (new M([[0,1,2,3]])).shape();
            var res = [1,4];
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test shape', () => {
        M.execute(function(M){
            var A = new M([[0,1,2,3]]);
            A = M.shape(A);
            var res = [1,4];
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test columns', () => {
        M.execute(function(M){
            var A = M.range(3).transpose().catH(3).columns(0,1);
            var res = new M([[0,1]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test column', () => {
        M.execute(function(M){
            var A = M.range(3).transpose().catH(3).column(0);
            var res = new M([[0]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test rows', () => {
        M.execute(function(M){
            var A = M.range(3).rows(0,1);
            var res = new M([[0],[1]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test row', () => {
        M.execute(function(M){
            var A = M.range(3).row(1);
            var res = new M([[1]]);
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });
});