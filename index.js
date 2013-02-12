var dir = (typeof process !== 'undefined' && process.env.SWIG_COVERAGE) ? './lib-cov/' : './lib/';

module.exports = require(dir + 'swig');
