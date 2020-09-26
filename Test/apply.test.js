var M = require('../src/matrix_lib');

var A = new M([[1.1,2.1,3.3],[4.4,5.5,6.6],[7.7,8.8,5.5]]);
var res = new M([[1,2,3],[4,6,7],[8,9,6]]);

beforeEach(() => {
    A = new M([[1.1,2.1,3.3],[4.4,5.5,6.6],[7.7,8.8,5.5]]);
    res = new M([[1,2,3],[4,6,7],[8,9,6]]);
});


describe(`Test apply functionality where\r\nA =\r\n${A}\r\n`, () => {

    test(`Test A.apply(Math.round) == res`, () => {
        A = A.apply(Math.round);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

});