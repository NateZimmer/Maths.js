var M = require('../src/matrix_lib');

describe(`Test transpose functionality`, () => {
    test('Test transpose', () => {
        M.execute(function(M){
            var A = new M([[1,2],[3,4]]);
            A = A.transpose();
            var res = M.make([[1,3],[2,4]])
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test('Test transpose 2', () => {
        M.execute(function(M){
            var A = new M([[1,2],[3,4]]);
            A = M.t(A);
            A = A.t();
            A = M.transpose(A)
            var res = M.make([[1,3],[2,4]])
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });
});
