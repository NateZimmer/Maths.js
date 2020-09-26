

require('./lib/add');
require('./lib/subtract');
require('./lib/print');
require('./lib/multiply');
require('./lib/transpose');
require('./lib/invert');
require('./lib/shape');
require('./lib/stats');
require('./lib/create');
require('./lib/diag');
require('./lib/bound');
require('./lib/delete');
require('./lib/random');
require('./lib/flatten');
require('./lib/pow');
require('./lib/fill');
require('./lib/apply');
require('./lib/divide');
require('./lib/lag');
require('./lib/execute');

var M = require('./matrix');
M.util = require('./lib/mUtils');

module.exports = M; 