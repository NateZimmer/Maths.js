var M = require('../src/matrix_lib');


describe(`Test lag functionality`, () => {

    test(`Test M.range(5).lag(0,2).deleteRows(0,1) == res`, () => {
        var A = M.range(5).lag(0,2).deleteRows(0,1);
        var res = M.make([ [ 2, 1, 0 ], [ 3, 2, 1 ], [ 4, 3, 2 ] ]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.range(5).lagTrim(0,2) == res`, () => {
        var A = M.range(5).lagTrim(0,2);
        var res = M.make([ [ 2, 1, 0 ], [ 3, 2, 1 ], [ 4, 3, 2 ] ]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

});