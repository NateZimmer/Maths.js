var M = require('../matrix');
var overload = require('operator-overloading-nz-fork');

// Add scalar operators 
for(var operator in M.numberOverrides){
    Number.prototype[operator] = M.numberOverrides[operator];
}

function execute(functionPtr){
    overload(functionPtr)(M);
}

M.execute = execute;