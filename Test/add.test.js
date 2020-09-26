var M = require('../src/matrix_lib');

var a = new M([[1,2,3],[4,5,6],[7,8,5]]);
var res = new M([[2,3,4],[5,6,7],[8,9,6]]);

beforeEach(() => {
    A = new M([[1,2,3],[4,5,6],[7,8,5]]);
    res = new M([[2,3,4],[5,6,7],[8,9,6]]);
});


describe(`Test adding functionality where\r\nA =\r\n${a}\r\nAdd 1 to get res\r\n${res}\r\n`, () => {

    test(`Test A.add(1) == res`, () => {
        A = A.add(1);
        expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test M.add(1,A) == res`, () => {
        var B = M.add(1,A);
        expect(JSON.stringify(B.value)).toBe(JSON.stringify(res.value));
    });

    test(`Test execute M.run({ A = A + 1 ==> res })`, () => {

        M.execute(function(M){
            var A = new M([[1,2,3],[4,5,6],[7,8,5]]);
            var res = new M([[2,3,4],[5,6,7],[8,9,6]]);
            A = A + 1;
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

    test(`Test execute M.run({ A + A == 2A})`, () => {

        M.execute(function(M){
            var A = new M([[1,2,3],[4,5,6],[7,8,5]]);
            var res = new M([[2,4,6],[8,10,12],[14,16,10]]);
            A = A + A;
            expect(JSON.stringify(A.value)).toBe(JSON.stringify(res.value));
        });
    });

});