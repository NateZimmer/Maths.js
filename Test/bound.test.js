var M = require('../src/matrix_lib');

var A = new M([[1.1,2.1,3.3],[4.4,5.5,6.6],[7.7,8.8,5.5]]);
var res = new M([[0,0,0],[0,1,1],[1,1,1]]);

beforeEach(() => {
    A = new M([[1.1,2.1,3.3],[4.4,5.5,6.6],[7.7,8.8,5.5]]);
    res = new M([[0,0,0],[0,1,1],[1,1,1]]);
});


describe(`Test bound functionality where\r\nA =\r\n${A}\r\n`, () => {

    test(`Test A.checkBounds(-1,5) == res`, () => {
        A = A.checkBounds(-1,5);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.checkBounds(A,-1,5) == res`, () => {
        A = M.checkBounds(A,-1,5);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

});