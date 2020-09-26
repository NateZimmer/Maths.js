var M = require('../src/matrix_lib');


describe(`Test invert functionality`, () => {

    test(`Test A = M.make([[1,2,3],[4,5,6],[7,8,5]]).invert().round(2)`, () => {
        var A = M.make([[1,2,3],[4,5,6],[7,8,5]]).invert().round(2);
        var res = [[ -1.92, 1.17, -0.25 ],[ 1.83, -1.33, 0.5 ],[ -0.25, 0.5, -0.25 ]];
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res));
    });

    test(`Test M.make([[1,2,3],[4,5,6],[7,8,5]]).pinv().round(2)`, () => {
        var A = M.make([[1,2,3],[4,5,6],[7,8,5]]).pinv().round(2);
        var res = [[ -1.92, 1.17, -0.25 ],[ 1.83, -1.33, 0.5 ],[ -0.25, 0.5, -0.25 ]];
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res));
    });

    test(`Test M.invert(A).round(2)`, () => {
        var A = M.make([[1,2,3],[4,5,6],[7,8,5]]);
        A = M.invert(A).round(2);
        var res = [[ -1.92, 1.17, -0.25 ],[ 1.83, -1.33, 0.5 ],[ -0.25, 0.5, -0.25 ]];
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res));
    });
});