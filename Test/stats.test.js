var M = require('../src/matrix_lib');

describe(`Test stats functionality`, () => {

    test('Test mean', () => {
        M.execute(function(M){
            var A = new M([[1,2],[3,4]]);
            A = A.mean();
            var res = 2.5
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test rms', () => {
        M.execute(function(M){
            var A = M.ones(2,2).rms();
            var res = 1;
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test min', () => {
        M.execute(function(M){
            var A = M.range(3) + (-3);
            A = A.min();
            var res = -3
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test max', () => {
        M.execute(function(M){
            var A = M.range(3) + (-3);
            A = A.max();
            var res = -1
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test length proto', () => {
        M.execute(function(M){
            var A = M.range(5).catH(M.range(5)); // size: 5,2 
            A = A.length();
            var res = 5;
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

    test('Test length', () => {
        M.execute(function(M){
            var A = M.range(5).catH(M.range(5)); // size: 5,2 
            A = M.len(A);
            var res = 5;
            expect(JSON.stringify(A)).toBe(JSON.stringify(res));
        });
    });

});