var M = require('../src/matrix_lib');


describe(`Test adding divide functionality`, () => {

    test(`Test A.add(1) == res`, () => {
        var A = M.make([1,1]);
        var B = M.make([4,2]);
        A = M.divide(A,B);
        var res = M.make([[0.25,0.5]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test A.add(1) == res`, () => {
        var A = M.make([1,1]);
        var B = M.make([4,2]);
        A = A.divide(B);
        var res = M.make([[0.25,0.5]]);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });
});