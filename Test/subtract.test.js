var M = require('../src/matrix_lib');

var a = new M([[1,2,3],[4,5,6],[7,8,5]]);
var res = new M([[0,1,2],[3,4,5],[6,7,4]]);

beforeEach(() => {
    A = new M([[1,2,3],[4,5,6],[7,8,5]]);
    res = new M([[0,1,2],[3,4,5],[6,7,4]]);
});


describe(`Test subtract functionality where\r\nA =\r\n${a}\r\nMinus 1 to get res\r\n${res}\r\n`, () => {

    test(`Test A.subtract(1) == res`, () => {
        A = A.subtract(1);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.subtract(1,A) == res`, () => {
        var B = M.subtract(1,A);
        expect(JSON.stringify(B.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test execute M.run({ A = A - 1 ==> res })`, () => {
        M.execute(function(M){
            var A = new M([[1,2,3],[4,5,6],[7,8,5]]);
            var res = new M([[0,1,2],[3,4,5],[6,7,4]]);
            A = A + 1;
            A = A - 1;
            A = -1 + A;
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute M.run({ A - A == 0A})`, () => {
        M.execute(function(M){
            var A = new M([[1,2,3],[4,5,6],[7,8,5]]);
            var res = new M([[0,0,0],[0,0,0],[0,0,0]]);
            A = A - A;
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

});